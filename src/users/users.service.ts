import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async getUserAndLocationByMac(mac: string) {
    const formattedMac = mac.replace(/-/g, ':').toUpperCase();

    const query = `
      SELECT n.user as useranalytics, n.location, n.device_brand, 
             n.status as node_status, l.status as location_status
      FROM node n
      JOIN man_location l ON l.location = n.location
      WHERE n.macaddr_lan = ?
    `;

    const result = await this.dataSource.query(query, [formattedMac]);
    return result.length ? result[0] : null;
  }

  async isMacAlreadyRegistered(mac: string, user: string) {
    const query = `
      SELECT COUNT(*) as cuenta
      FROM man_person 
      WHERE macaddr = ? AND user = ? AND registered_in = 'wifisocial'
    `;

    const result = await this.dataSource.query(query, [mac, user]);
    return { exists: result[0]?.cuenta > 0 };
  }
}
