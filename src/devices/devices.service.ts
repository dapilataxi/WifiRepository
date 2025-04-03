import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Node } from './entities/node.entity';
import { Location } from './entities/location.entity';
import { Campaign } from './entities/campaign.entity';
import { WifiCaptivePortal } from './entities/wifi-captive-portal.entity';
import { Person } from './entities/person.entity';
import { DeviceQueryDto } from './dto/device-query.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Node)
    private readonly nodeRepository: Repository<Node>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    @InjectRepository(WifiCaptivePortal)
    private readonly wifiCaptivePortalRepository: Repository<WifiCaptivePortal>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async verify(query: DeviceQueryDto) {
    let mac_device: string;

    if (query.mac_device) {
      mac_device = query.mac_device.replace(/%3A/gi, ':');
    } else if (query.ap_mac) {
      mac_device = decodeURIComponent(query.ap_mac);
    } else if (query.apmac) {
      mac_device = decodeURIComponent(query.apmac).toUpperCase();
    } else {
      mac_device = decodeURIComponent('E8%3A1C%3ABA%3A95%3AE4%3AC8').toUpperCase();
    }

    mac_device = mac_device.replace(/-/g, ':');

    const node = await this.nodeRepository.findOne({
      where: { macaddrLan: mac_device },
      relations: ['locationEntity'],
    });

    if (!node) throw new BadRequestException('Nodo no encontrado');

    const useranalytics = node.user;
    const node_status = node.status;
    const location_status = node.locationEntity?.status ?? '';

    
    const location_name = node.location;

    let attempt_error = 0;
    let attempt_error_description = '';
    let device = node.device_brand;

    if (location_status !== '0' || node_status !== '0') {
      attempt_error = 1;
      if (location_status !== '0') {
        attempt_error_description = 'Inactive Location';
      } else if (node_status !== '0') {
        attempt_error_description = 'Inactive NodeWA';
      }
    }

    await this.wifiCaptivePortalRepository.save({
      userAnalytics: useranalytics,
      deviceMac: mac_device,
      datetime: new Date(),
      attemptError: attempt_error,
      attemptErrorDescription: attempt_error_description,
    });

    // Configuración de login
    let mac = '';
    let linkorig = '';
    let linklogin = '';
    let tses = '';
    let magic = '';

    switch (device.toLowerCase()) {
      case 'mikrotik':
        mac = query.mac ?? '';
        linklogin = query['link-login-only'] ?? '';
        linkorig = query['link-orig'] ?? '';
        break;

      case 'ruckus':
        mac = query.mac?.replace(/-/g, ':') ?? '';
        linkorig = query.url ?? '';
        linklogin = `http://${query.uamip}:${query.uamport}/login`;
        break;

      case 'meraki':
        mac = query.client_mac?.toUpperCase() ?? '';
        linkorig = query.continue_url ? decodeURIComponent(query.continue_url) : '';
        linklogin = query.login_url ? decodeURIComponent(query.login_url) : '';
        break;

      case 'unifi':
        mac = query.mac ?? '';
        tses = query.t ?? '';
        linklogin = `http://65.21.7.163:8880/guest/s/fp3lzbfk/prelogin.html?username=${mac}&password=${mac}&t=${tses}`;
        if (mac_device === 'B4:FB:E4:96:A9:A6' || mac_device === 'B4:FB:E4:96:A2:AB' || mac_device === 'B4:FB:E4:96:A3:15') {
          linklogin = `http://10.10.20.29:8880/guest/s/fz37mkiz/prelogin.html?username=${mac}&password=${mac}&t=${tses}`;
        }
        linkorig = query.url ?? '';
        break;

      case 'fortinet':
        mac = query.usermac?.toUpperCase() ?? '';
        magic = query.magic ?? '';
        linklogin = `${query.post}?magic=${magic}`;
        break;

      case 'grandstream':
        mac = query.client_mac?.replace(/-/g, ':').toUpperCase() ?? '';
        linklogin = `${query.login_url}?username=${mac}&password=${mac}&redirect=${query.auto_redirect_url}`;
        break;

      default:
        mac = query.mac ?? '';
        break;
    }

    // Verifica si la persona ya está registrada
    const exists = await this.personRepository.count({
      where: {
        mac: mac,
        user: useranalytics,
        registeredIn: 'wifisocial',
      },
    });

    // Verifica campañas WIFI
    const campaigns = await this.campaignRepository.find({
      where: {
        user: useranalytics,
        type: 'WIFI',
        typeWifi: 'REGISTER',
        status: '0',
      },
      order: { id: 'DESC' },
    });

    return {
      useranalytics,
      device,
      mac,
      linklogin,
      linkorig,
      registered: exists > 0,
      campaigns,
    };
  }
}
