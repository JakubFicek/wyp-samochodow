import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import KlientController from './klient.controller';
import Klient from './klient.entity';
import KlientService from './klient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Klient])],
  controllers: [KlientController],
  providers: [KlientService],
})
export class KlientModule {}
