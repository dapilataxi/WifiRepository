import { Controller, Get, Query } from '@nestjs/common';
import { WifiService } from './wifi.service';
import { WifiRequestDto } from './dto/wifi-request.dto';
import { WifiResponseDto } from './dto/wifi-response.dto';

@Controller('wifianalytics')
export class WifiController {
  constructor(private readonly wifiService: WifiService) {}

  @Get('validate')
  async validate(@Query() query: WifiRequestDto): Promise<WifiResponseDto> {
    return this.wifiService.validateWifiConnection(query);
  }
}
