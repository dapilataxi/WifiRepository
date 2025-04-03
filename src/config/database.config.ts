import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '195.201.99.215',
  port: 3306,
  username: 'dpilataxi_nodeanalytics',
  password: 'tree-cat-bleach',
  database: 'analytics',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false, // ❌ Importante dejar en false para no sobrescribir
};
