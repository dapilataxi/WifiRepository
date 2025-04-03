import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Location } from './entities/location.entity';
import { Node } from './entities/node.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location, Node])  // entidades si decides usarlas
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]  // opcional si otro módulo va a usarlo
})
export class UsersModule {}
