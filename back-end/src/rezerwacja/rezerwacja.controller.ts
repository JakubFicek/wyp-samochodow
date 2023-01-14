import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { edytujRezerwacjeDto } from './dto/edytujRezerwacje.dto';
import { RezerwacjaDto } from './dto/rezerwacja.dto';
import RezerwacjaService from './rezerwacja.service';

@Controller('rezerwacja')
export default class RezerwacjaController {
  constructor(private readonly rezerwacjaService: RezerwacjaService) {}

  //@Get('znajdz/:id') znajdz rezerwacje - potem zrobic

  @Post()
  async stworzRezerwacje(rezerwacja: RezerwacjaDto) {
    return this.rezerwacjaService.stworzRezerwacje(rezerwacja);
  }

  @Delete(':id')
  async usunRezerwacje(@Param('id') id: string) {
    return this.rezerwacjaService.usunRezerwacje(Number(id));
  }
}
