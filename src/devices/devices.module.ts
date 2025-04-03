import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';

import { Node } from './entities/node.entity';
import { Location } from './entities/location.entity';
import { Campaign } from './entities/campaign.entity';
import { WifiCaptivePortal } from './entities/wifi-captive-portal.entity';
import { Person } from './entities/person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Node,
      Location,
      Campaign,
      WifiCaptivePortal,
      Person,
    ]),
  ],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
