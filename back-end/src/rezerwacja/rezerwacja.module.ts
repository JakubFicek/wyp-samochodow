import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RezerwacjaController from './rezerwacja.controller';
import Rezerwacja from './rezerwacja.entity';
import RezerwacjaService from './rezerwacja.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rezerwacja])],
  controllers: [RezerwacjaController],
  providers: [RezerwacjaService],
})
export class RezerwacjaModule {}
