import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { edytujKlientDto } from './dto/edytujKlient.dto';
import { KlientDto } from './dto/klient.dto';
import KlientService from './klient.service';

@Controller('klient')
export default class KlientController {
  constructor(private readonly klientService: KlientService) {}

  @Get('weryfikacja/:id')
  async weryfikacja_danych(@Param('id') id: string) {
    return this.klientService.weryfikacja_danych(Number(id));
  }

  //reszta po zrobieniu platnosci
}
