import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import Rezerwacja from 'src/rezerwacja/rezerwacja.entity';
import Wypozyczenie from 'src/wypozyczenie/wypozyczenie.entity';
import RaportController from './raport.controller';
import Raport from './raport.entity';
import RaportService from './raport.service';

@Module({
  imports: [TypeOrmModule.forFeature([Raport, Wypozyczenie, Rezerwacja])],
  controllers: [RaportController],
  providers: [RaportService],
})
export class RaportModule {}
