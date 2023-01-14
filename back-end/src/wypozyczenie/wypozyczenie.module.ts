import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import WypozyczenieController from './wypozyczenie.controller';
import Wypozyczenie from './wypozyczenie.entity';
import WypozyczenieService from './wypozyczenie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wypozyczenie])],
  controllers: [WypozyczenieController],
  providers: [WypozyczenieService],
})
export class WypozyczenieModule {}
