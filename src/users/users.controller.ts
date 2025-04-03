import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('wifianalytics')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUserInfoByMac(@Query('mac') mac: string) {
    return this.usersService.getUserAndLocationByMac(mac);
  }

  @Get('check')
  async isMacRegistered(@Query('mac') mac: string, @Query('user') user: string) {
    return this.usersService.isMacAlreadyRegistered(mac, user);
  }
}
