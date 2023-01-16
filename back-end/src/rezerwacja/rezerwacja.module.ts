import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Samochod from 'src/samochod/samochod.entity';
import SamochodService from 'src/samochod/samochod.service';
import RezerwacjaController from './rezerwacja.controller';
import Rezerwacja from './rezerwacja.entity';
import RezerwacjaService from './rezerwacja.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rezerwacja, Samochod])],
  controllers: [RezerwacjaController],
  providers: [RezerwacjaService, SamochodService],
})
export class RezerwacjaModule {}
