import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Samochod from 'src/samochod/samochod.entity';
import WypozyczenieController from './wypozyczenie.controller';
import Wypozyczenie from './wypozyczenie.entity';
import WypozyczenieService from './wypozyczenie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wypozyczenie, Samochod])],
  controllers: [WypozyczenieController],
  providers: [WypozyczenieService],
})
export class WypozyczenieModule {}
