import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Req, UseGuards } from '@nestjs/common/decorators';
import Rola from 'src/pracownicy/enum/role.enum';
import RoleGuard from 'src/pracownicy/guard/role.guard';
import { RequestWithUser } from 'src/typy/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/weryfikacja/guards/jwt-authentication.guard';
import JwtAuthenticationGuardPracownik from 'src/weryfikacja/guards/jwt-authenticationP.guard';
import { JwtStrategyPracownik } from 'src/weryfikacja/strategy/jwtPracownik.strategy';

import { edytujRezerwacjeDto } from './dto/edytujRezerwacje.dto';
import { RezerwacjaDto } from './dto/rezerwacja.dto';
import RezerwacjaService from './rezerwacja.service';

@Controller('rezerwacja')
export default class RezerwacjaController {
  constructor(private readonly rezerwacjaService: RezerwacjaService) {}

  //@Get('znajdz/:id') znajdz rezerwacje - potem zrobic
  @Get('znajdz/:id')
  @UseGuards(
    JwtAuthenticationGuard ||
      RoleGuard(Rola.Administrator) ||
      RoleGuard(Rola.Sprzedawca),
  )
  async znajdzRezerwacje(@Param('id') id: string) {
    return this.rezerwacjaService.znajdzRezerwacje(Number(id));
  }

  @Get('wypisz')
  @UseGuards(JwtAuthenticationGuard)
  async wypiszRezerwacje(@Req() request: RequestWithUser) {
    //wypisac rezerwacje przypisane do danego klienta (zalogowanego)
    return await this.rezerwacjaService.wypiszRezerwacje(request.user);
  }

  @Post('create')
  @UseGuards(JwtAuthenticationGuard)
  async stworzRezerwacje(
    @Body() rezerwacja: RezerwacjaDto,
    @Req() request: RequestWithUser,
  ) {
    return this.rezerwacjaService.stworzRezerwacje(rezerwacja, request.user);
  }

  @Delete(':id')
  @UseGuards(
    JwtAuthenticationGuard ||
      RoleGuard(Rola.Administrator) ||
      RoleGuard(Rola.Sprzedawca),
  )
  async usunRezerwacje(@Param('id') id: string) {
    return this.rezerwacjaService.usunRezerwacje(Number(id));
  }
}
