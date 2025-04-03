import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiController } from './wifi.controller';
import { WifiService } from './wifi.service';
import { WifiLog } from './entities/log.entity';
import { RedirectUrl } from './entities/redirect-url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WifiLog, RedirectUrl])],
  controllers: [WifiController],
  providers: [WifiService],
  exports: [WifiService]
})
export class WifiModule {}
