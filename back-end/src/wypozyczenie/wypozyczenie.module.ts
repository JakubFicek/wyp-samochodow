import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Rezerwacja from 'src/rezerwacja/rezerwacja.entity';
import RezerwacjaService from 'src/rezerwacja/rezerwacja.service';
import Samochod from 'src/samochod/samochod.entity';
import WypozyczenieController from './wypozyczenie.controller';
import Wypozyczenie from './wypozyczenie.entity';
import WypozyczenieService from './wypozyczenie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wypozyczenie, Samochod, Rezerwacja])],
  controllers: [WypozyczenieController],
  providers: [WypozyczenieService, RezerwacjaService],
})
export class WypozyczenieModule {}
