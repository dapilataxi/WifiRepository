import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { NodeEntity } from './entities/node.entity';
import { LocationEntity } from './entities/location.entity';
import { WifiCaptivePortalEntity } from './entities/wifi-captive-portal.entity';
import { WifiRegisterEntity } from './entities/wifi-register.entity';
import { WifiRegisterLocationEntity } from './entities/wifi-register-location.entity';
import { WifiSocialOptionsEntity } from './entities/wifi-social-options.entity';
import { PersonEntity } from './entities/person.entity';
import { CampaignEntity } from './entities/campaign.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NodeEntity,
      LocationEntity,
      WifiCaptivePortalEntity,
      WifiRegisterEntity,
      WifiRegisterLocationEntity,
      WifiSocialOptionsEntity,
      PersonEntity,
      CampaignEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
