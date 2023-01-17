import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Rezerwacja from 'src/rezerwacja/rezerwacja.entity';
import RezerwacjaService from 'src/rezerwacja/rezerwacja.service';
import Wypozyczenie from 'src/wypozyczenie/wypozyczenie.entity';
import WypozyczenieService from 'src/wypozyczenie/wypozyczenie.service';
import Platnosc from './platnosc.entity';
import PlatnoscService from './platnosc.service';

@Module({
  imports: [TypeOrmModule.forFeature([Platnosc, Wypozyczenie, Rezerwacja])],
  controllers: [],
  providers: [PlatnoscService],
})
export class PlatnoscModule {}
