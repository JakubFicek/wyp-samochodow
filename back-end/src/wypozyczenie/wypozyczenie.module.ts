import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Klient from 'src/klient/klient.entity';
import KlientService from 'src/klient/klient.service';
import Rezerwacja from 'src/rezerwacja/rezerwacja.entity';
import RezerwacjaService from 'src/rezerwacja/rezerwacja.service';
import Samochod from 'src/samochod/samochod.entity';
import WypozyczenieController from './wypozyczenie.controller';
import Wypozyczenie from './wypozyczenie.entity';
import WypozyczenieService from './wypozyczenie.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wypozyczenie, Samochod, Rezerwacja, Klient]),
  ],
  controllers: [WypozyczenieController],
  providers: [WypozyczenieService, RezerwacjaService, KlientService],
})
export class WypozyczenieModule {}
