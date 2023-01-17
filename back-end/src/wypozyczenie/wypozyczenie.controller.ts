import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { edytujWypozyczenieDto } from './dto/edytujWypozyczenie.dto';
import { WypozyczenieDto } from './dto/wypozyczenie.dto';
import WypozyczenieService from './wypozyczenie.service';
import RezerwacjaService from 'src/rezerwacja/rezerwacja.service';

@Controller('wypozyczenie')
export default class WypozyczenieController {
  constructor(
    private readonly wypozyczenieService: WypozyczenieService,
    private readonly rezerwacjaService: RezerwacjaService,
  ) {}

  @Get('znajdz/:id')
  async znajdzWypozyczenie(@Param('id') id: string) {
    return this.wypozyczenieService.znajdzWypozyczenie(Number(id));
  }

  @Post('create')
  async stworzWypozyczenie(@Body() wypozyczenie: WypozyczenieDto) {
    return this.wypozyczenieService.stworzWypozyczenie(wypozyczenie);
  }

  @Delete(':id')
  async usunWypozyczenie(@Param('id') id: string) {
    return this.wypozyczenieService.usunWypozyczenie(Number(id));
  }

  @Post('zrezerwacji/:id')
  async stworzWypozyczenieZRezerwacji(@Param('id') id: string) {
    if (this.rezerwacjaService.znajdzRezerwacje(Number(id))) {
      return this.wypozyczenieService.stworzWypozyczenieZRezerwacji(Number(id));
    } else return this.rezerwacjaService.znajdzRezerwacje(Number(id));
  }
}
