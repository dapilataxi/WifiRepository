import { Controller, Get, Query } from '@nestjs/common';
import { WelcomeService } from './welcome.service';

@Controller('wifianalytics')
export class WelcomeController {
  constructor(private readonly welcomeService: WelcomeService) {}

  @Get('welcomedata')
  async getWelcome(
    @Query('mac') mac: string,
    @Query('user') user?: string,
    @Query('device') device?: string,
    @Query('person_id') personId?: string,
  ) {
    const result = await this.welcomeService.getWelcomeData({
      mac,
      user,
      device,
      personId: personId ? parseInt(personId) : undefined,
    });

    return result;
  }
}
