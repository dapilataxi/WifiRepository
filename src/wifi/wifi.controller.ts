import { Controller, Get, Query } from '@nestjs/common';
import { WifiService } from './wifi.service';

@Controller('wifianalytics')
export class WifiController {
  constructor(private readonly wifiService: WifiService) {}

  @Get('validate')
  async validate(@Query() query: any) {
    return this.wifiService.validateWifiConnection(query);
  }
}
