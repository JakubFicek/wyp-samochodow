import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import PracownikController from "./controller/pracownik.controller";
import { Administrator } from "./entity/administrator.entity";
import { Serwisant } from "./entity/serwisant.entity";
import { Sprzedawca } from "./entity/sprzedawca.entity";
import PracownikService from "./service/pracownik.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Sprzedawca]),
    TypeOrmModule.forFeature([Serwisant]),
    TypeOrmModule.forFeature([Administrator]),
  ],
  controllers: [PracownikController],
  providers: [PracownikService],
})
  
export class PracownicyModule {}