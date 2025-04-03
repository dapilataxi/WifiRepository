import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async findByUserAndLocation(user: string, location: string) {
    return await this.locationRepository.findOne({
      where: { user, location },
    });
  }

  async getLocationData(user: string, location: string) {
    return await this.locationRepository.query(`
      SELECT wr.username, 
        wr.welcome_title AS bienvenida_titulo, 
        wr.welcome_html AS bienvenida_html, 
        IF(facebook_login = '0','Si','No') AS facebook_login, 
        IF(formulario_login = '0','Si','No') AS formulario_login, 
        IF(staff_login = 0,'Si','No') AS staff_login, 
        staff_pin,
        css_button_color, 
        css_button_text_color, 
        css_button_text_size, 
        powered_by_node, 
        multiple_registers, 
        auto_redirect_url, 
        IFNULL(disclaimer_html,'No') AS disclaimer_html, 
        IFNULL(disclaimer_short,'No') AS disclaimer_short, 
        welcome_css,
        form_image
      FROM man_wifi_register_location rl
      INNER JOIN man_location l ON l.user = rl.username AND l.location = ?
      INNER JOIN man_wifi_register wr ON wr.username = l.user AND rl.id_register = wr.id
      INNER JOIN man_wifi_social_options so ON so.username = l.user
      WHERE wr.status = '0' AND l.user = ?
    `, [location, user]);
  }

  async getRedirectUrl(user: string, location: string) {
    const result = await this.locationRepository.query(`
      SELECT redirect_url
      FROM node_location
      WHERE username = ? AND location = ?
    `, [user, location]);
    
    return result[0]?.redirect_url ?? null;
  }
}
