import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SamochodController from './samochod.controller';
import Samochod from './samochod.entity';
import SamochodService from './samochod.service';

@Module({
  imports: [TypeOrmModule.forFeature([Samochod])],
  controllers: [SamochodController],
  providers: [SamochodService],
})
export class SamochodModule {}
