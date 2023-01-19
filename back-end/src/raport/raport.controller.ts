import {
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
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
