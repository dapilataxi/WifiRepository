import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NodeEntity } from './entities/node.entity';
import { LocationEntity } from './entities/location.entity';
import { WifiCaptivePortalEntity } from './entities/wifi-captive-portal.entity';
import { WifiRegisterEntity } from './entities/wifi-register.entity';
import { WifiRegisterLocationEntity } from './entities/wifi-register-location.entity';
import { WifiSocialOptionsEntity } from './entities/wifi-social-options.entity';
import { CampaignEntity } from './entities/campaign.entity';
import { PersonEntity } from './entities/person.entity';
import { Repository } from 'typeorm';
import { ValidateDeviceDto } from './dto/validate-device.dto';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(NodeEntity)
    private readonly nodeRepo: Repository<NodeEntity>,
    @InjectRepository(LocationEntity)
    private readonly locationRepo: Repository<LocationEntity>,
    @InjectRepository(WifiCaptivePortalEntity)
    private readonly captiveRepo: Repository<WifiCaptivePortalEntity>,
    @InjectRepository(WifiRegisterEntity)
    private readonly wifiRegisterRepo: Repository<WifiRegisterEntity>,
    @InjectRepository(WifiRegisterLocationEntity)
    private readonly wifiRegLocRepo: Repository<WifiRegisterLocationEntity>,
    @InjectRepository(WifiSocialOptionsEntity)
    private readonly socialOptionsRepo: Repository<WifiSocialOptionsEntity>,
    @InjectRepository(CampaignEntity)
    private readonly campaignRepo: Repository<CampaignEntity>,
    @InjectRepository(PersonEntity)
    private readonly personRepo: Repository<PersonEntity>,
  ) {}

  async handleAuth(query: ValidateDeviceDto, req: Request) {
    const session = req.session as any;

    // 1. Obtener MAC
    const mac_device =
      query.mac_device ||
      query.ap_mac ||
      query.apmac ||
      'E8:1C:BA:95:E4:C8';

    const mac = mac_device.replace(/%3A/g, ':').replace(/-/g, ':').toUpperCase();

    // 2. Validar nodo y ubicación
    const node = await this.nodeRepo
      .createQueryBuilder('n')
      .innerJoinAndSelect(LocationEntity, 'l', 'n.location = l.location')
      .where('n.macaddr_lan = :mac', { mac })
      .select([
        'n.user AS user',
        'n.location AS location',
        'n.device_brand AS device_brand',
        'n.status AS node_status',
        'l.status AS location_status',
      ])
      .getRawOne();

    if (!node) throw new Error('Nodo no encontrado');

    const { user, location, device_brand, node_status, location_status } = node;

    let attemptError = 0;
    let attemptErrorDesc = '';

    if (node_status !== '0' || location_status !== '0') {
      attemptError = 1;
      attemptErrorDesc =
        location_status !== '0' ? 'Inactive Location' : 'Inactive NodeWA';
    }

    // 3. Guardar en wifi_captive_portal
    await this.captiveRepo.insert({
      userAnalytics: user,
      deviceMac: mac,
      datetime: new Date(),
      attemptError,
      attemptErrorDescription: attemptErrorDesc,
    });

    session.device = device_brand;
    session.user = user;
    session.location = location;

    // 4. Obtener parámetros de configuración del portal
    const config = await this.wifiRegLocRepo
      .createQueryBuilder('rl')
      .innerJoinAndMapOne(
        'rl.register',
        WifiRegisterEntity,
        'wr',
        'wr.id = rl.idRegister AND wr.username = rl.username AND wr.status = 0',
      )
      .innerJoinAndMapOne(
        'rl.location',
        LocationEntity,
        'l',
        'l.idLocation = rl.location AND l.user = rl.username',
      )
      .innerJoinAndMapOne(
        'rl.social',
        WifiSocialOptionsEntity,
        'so',
        'so.username = rl.username',
      )
      .where('rl.username = :user AND l.location = :location', {
        user,
        location,
      })
      .getOne();

    if (!config) throw new Error('Configuración no encontrada');

    const register = config.register;
    const auto_redirect_url =
      register.autoRedirectUrl === 'mutiple'
        ? (
            await this.nodeRepo
              .createQueryBuilder('nl')
              .select('nl.redirect_url', 'redirect')
              .where('nl.username = :user AND nl.location = :location', {
                user,
                location,
              })
              .getRawOne()
          )?.redirect || ''
        : register.autoRedirectUrl;

    session.staffpin = register.staffPin ? this.hash(register.staffPin) : '';
    session.powered_by_node = register.poweredByNode;
    session.disclaimer_html = register.disclaimerHtml || 'No';
    session.disclaimer_short = register.disclaimerShort || 'No';

    // 5. Revisar si la MAC ya está registrada
    const existing = await this.personRepo.count({
      where: {
        macaddr: mac,
        user,
        registeredIn: 'wifisocial',
      },
    });

    if (existing > 0 && register.multipleRegisters === '0') {
      return { redirect: true, redirectUrl: '/wifianalytics/welcome?from=index' };
    }

    // 6. Verificar si hay login permitido
    const fb = config.social.facebookLogin === '0';
    const form = config.social.formularioLogin === '0';
    const staff = config.social.staffLogin === 0;

    if (!fb && !form && !staff) {
      return { redirect: true, redirectUrl: '/wifianalytics/welcome?from=index' };
    }

    // 7. Obtener campañas
    const campaigns = await this.campaignRepo.find({
      where: {
        user,
        type: 'WIFI',
        typeWifi: 'REGISTER',
        status: '0',
      },
      order: { id: 'DESC' },
    });

    return {
      user,
      mac,
      location,
      device: device_brand,
      config: {
        welcomeTitle: register.welcomeTitle,
        welcomeHtml: register.welcomeHtml,
        autoRedirectUrl: auto_redirect_url,
        css: {
          color: register.cssButtonColor,
          textColor: register.cssButtonTextColor,
          textSize: register.cssButtonTextSize,
          welcomeCss: register.welcomeCss,
        },
        poweredBy: register.poweredByNode,
        campaigns,
        facebookLogin: fb,
        formularioLogin: form,
        staffLogin: staff,
      },
    };
  }

  hash(str: string) {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(str).digest('hex');
  }
}
