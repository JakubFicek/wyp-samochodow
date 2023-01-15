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
  @Get('znajdz/:id')
  async znajdzRezerwacje(@Param() id: string) {
    return this.rezerwacjaService.znajdzRezerwacje(Number(id));
  }

  @Post('create')
  async stworzRezerwacje(@Body() rezerwacja: RezerwacjaDto) {
    return this.rezerwacjaService.stworzRezerwacje(rezerwacja);
  }

  @Delete(':id')
  async usunRezerwacje(@Param('id') id: string) {
    return this.rezerwacjaService.usunRezerwacje(Number(id));
  }
}
