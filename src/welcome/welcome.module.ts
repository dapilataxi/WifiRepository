import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WelcomeService } from './welcome.service';
import { WelcomeController } from './welcome.controller';
import { WifiCaptivePortal } from '../auth/entities/wifi-captive-portal.entity';
import { WifiSocialOptions } from '../auth/entities/wifi-social-options.entity';
import { Campaign } from '../campaigns/entities/campaign.entity';
import { Person } from '../auth/entities/person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WifiCaptivePortal,
      WifiSocialOptions,
      Campaign,
      Person,
    ]),
  ],
  controllers: [WelcomeController],
  providers: [WelcomeService],
})
export class WelcomeModule {}
