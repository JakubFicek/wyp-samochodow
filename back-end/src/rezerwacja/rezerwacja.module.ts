import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Klient from 'src/klient/klient.entity';
import KlientService from 'src/klient/klient.service';
import Samochod from 'src/samochod/samochod.entity';
import SamochodService from 'src/samochod/samochod.service';
import Wypozyczenie from 'src/wypozyczenie/wypozyczenie.entity';
import WypozyczenieService from 'src/wypozyczenie/wypozyczenie.service';
import RezerwacjaController from './rezerwacja.controller';
import Rezerwacja from './rezerwacja.entity';
import RezerwacjaService from './rezerwacja.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rezerwacja, Wypozyczenie, Samochod, Klient]),
  ],
  controllers: [RezerwacjaController],
  providers: [
    RezerwacjaService,
    SamochodService,
    KlientService,
    WypozyczenieService,
  ],
})
export class RezerwacjaModule {}
