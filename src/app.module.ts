import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiModule } from './wifi/wifi.module';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { DevicesModule } from './devices/devices.module';
import { AuthModule} from './auth/auth.module';
import { CampaignsModule} from './campaigns/campaigns.module';
import { WelcomeModule } from './welcome/welcome.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '195.201.99.215',
      port: 3306,
      username: 'dpilataxi_nodeanalytics',
      password: 'tree-cat-bleach',
      database: 'analytics',
      autoLoadEntities: true,
      synchronize: false, // ⚠️ Nunca usar true con base de datos real
    }),
    WifiModule, // ✅ Asegúrate de que está aquí
    UsersModule,
    LocationsModule,
    DevicesModule,
    AuthModule,
    CampaignsModule,
    WelcomeModule,
  ],
})
export class AppModule {}