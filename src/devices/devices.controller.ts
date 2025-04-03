// src/devices/devices.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DeviceQueryDto } from './dto/device-query.dto';

@Controller('wifianalytics')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get('verify')
  async verifyDevice(@Query() query: DeviceQueryDto) {
    return this.devicesService.verify(query);
  }
}
