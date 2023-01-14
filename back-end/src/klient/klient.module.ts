import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Wypozyczenie from 'src/wypozyczenie/wypozyczenie.entity';
import KlientController from './klient.controller';
import Klient from './klient.entity';
import KlientService from './klient.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Klient]), 
    TypeOrmModule.forFeature([Wypozyczenie])],
  controllers: [KlientController],
  providers: [KlientService],
  exports: [KlientService],
})
export class KlientModule {}
