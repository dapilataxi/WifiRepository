import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { WifiLog } from './entities/log.entity';
import { RedirectUrl } from './entities/redirect-url.entity';

@Injectable()
export class WifiService {
  constructor(
    @InjectRepository(WifiLog)
    private logRepo: Repository<WifiLog>,
    @InjectRepository(RedirectUrl)
    private redirectRepo: Repository<RedirectUrl>,
    private readonly dataSource: DataSource,
  ) {}

  normalizeMac(query: any): string {
    let mac = query.mac_device || query.ap_mac || query.apmac || 'E8:1C:BA:95:E4:C8';
    return decodeURIComponent(mac).replace(/-/g, ':').toUpperCase();
  }

  async validateWifiConnection(queryParams: any) {
    const macDevice = this.normalizeMac(queryParams);

    // consulta nodo
    const [node] = await this.dataSource.query(
      `SELECT n.user, n.location, device_brand, n.status AS node_status, l.status AS location_status
       FROM node n JOIN man_location l ON l.location = n.location
       WHERE n.macaddr_lan = ?`,
      [macDevice],
    );

    const user = node?.user;
    const location = node?.location;
    const device = node?.device_brand;
    const nodeStatus = node?.node_status;
    const locationStatus = node?.location_status;

    let attemptError = 0;
    let attemptErrorDescription = '';

    if (!user || nodeStatus !== '0' || locationStatus !== '0') {
      attemptError = 1;
      attemptErrorDescription = locationStatus !== '0' ? 'Inactive Location' : 'Inactive NodeWA';
    }

    // registrar intento
    await this.logRepo.save({
      userAnalytics: user,
      deviceMac: macDevice,
      attemptError,
      attemptErrorDescription,
      datetime: new Date()
    });

    // parámetros del portal
    const [config] = await this.dataSource.query(
      `SELECT wr.username, wr.welcome_title, wr.welcome_html,
        IF(facebook_login = '0', 'Si', 'No') AS facebook_login,
        IF(formulario_login = '0', 'Si', 'No') AS formulario_login,
        IF(staff_login = 0, 'Si', 'No') AS staff_login,
        staff_pin, css_button_color, css_button_text_color, css_button_text_size,
        powered_by_node, multiple_registers, auto_redirect_url,
        IFNULL(disclaimer_html, 'No') AS disclaimer_html,
        IFNULL(disclaimer_short, 'No') AS disclaimer_short,
        welcome_css
      FROM man_wifi_register_location rl
      JOIN man_location l ON l.user = rl.username
      JOIN man_wifi_register wr ON wr.username = rl.username AND rl.id_register = wr.id
      JOIN man_wifi_social_options so ON so.username = rl.username
      WHERE l.user = ? AND l.location = ? AND wr.status = '0'`,
      [user, location],
    );

    let redirectUrl = config.auto_redirect_url;

    if (redirectUrl === 'mutiple') {
      const custom = await this.redirectRepo.findOne({ where: { username: user, location } });
      if (custom) redirectUrl = custom.redirectUrl;
    }

    return {
      mac: macDevice,
      user,
      location,
      device,
      config: {
        ...config,
        auto_redirect_url: redirectUrl,
        staff_pin_md5: config.staff_pin ? require('crypto').createHash('md5').update(config.staff_pin).digest('hex') : null,
      }
    };
  }
}
