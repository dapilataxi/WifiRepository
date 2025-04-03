import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../auth/entities/person.entity';
import { WifiSocialOptions } from '../auth/entities/wifi-social-options.entity';
import { Campaign } from '../campaigns/entities/campaign.entity';

@Injectable()
export class WelcomeService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,

    @InjectRepository(WifiSocialOptions)
    private readonly wifiOptionsRepository: Repository<WifiSocialOptions>,

    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async getWelcomeData(params: {
    mac: string;
    user?: string;
    device?: string;
    personId?: number;
  }) {
    const { mac, user = 'innobix', device = 'mikrotik', personId = null } = params;

    const options = await this.wifiOptionsRepository.findOne({
      where: { username: user },
    });

    if (!options) {
      return { error: 'No se encontró configuración social' };
    }

    const campaigns = await this.campaignRepository.find({
      where: {
        user,
        type: 'WIFI',
        typeWifi: 'REGISTER',
        status: '0',
      },
      order: { id: 'DESC' },
    });

    return {
      person_id: personId,
      mac,
      user,
      device,
      css_button_color: options.cssButtonColor,
      css_button_text_color: options.cssButtonTextColor,
      css_button_text_size: options.cssButtonTextSize,
      texto_boton: 'Clic aquí para navegar',
      facebook_page: options.facebookPage,
      megusta_requerido: options.megustaRequerido === 1 ? 'Si' : 'No',
      link_android: options.linkAndroid,
      name_app_android: options.nameAppAndroid,
      link_ios: options.linkIos,
      name_app_ios: options.nameAppIos,
      powered_by_node: options.poweredByNode,
      web_push_enabled: options.webPushEnabled,

      // 👉 Redirección automática y datos para formulario según el dispositivo
      linkonly: options.autoRedirectUrl,
      linkorig: 'http://www.google.com/', // valor simulado, cambiar por dinámico si es necesario
      usergeneric: mac,
      passgeneric: mac,
      magic: '0x1234', // valor simulado, ajustar si necesitas compatibilidad Fortinet
      tiempo_max_conexion: options.tiempoMaxConexion,
      ancho_banda: options.anchoBanda,

      // Campañas HTML
      campaigns: campaigns.map((c) => ({
        id: c.id,
        html: c.HTML,
        title: c.campaignName,
      })),
    };
  }
}
