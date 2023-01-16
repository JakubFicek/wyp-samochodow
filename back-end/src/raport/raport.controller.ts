import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { edytujRaportDto } from './dto/edytujRaport.dto';
import { RaportDto } from './dto/raport.dto';
import RaportService from './raport.service';

@Controller('raport')
export default class RaportController {
  constructor(private readonly raportService: RaportService) {}

  @Get()
  wypiszRaporty() {
    return this.raportService.wypiszRaporty();
  }

  @Get('ostatni')
  wypiszOstatniRaport() {
    return this.raportService.wypiszOstatniRaport();
  }

  @Post('create/:id')
  stworzRaport(@Param('id') id: string) {
    return this.raportService.stworzRaport(Number(id));
  }
}
