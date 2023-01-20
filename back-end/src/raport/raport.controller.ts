import { Controller, Get, Param, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import Rola from 'src/pracownicy/enum/role.enum';
import RoleGuard from 'src/pracownicy/guard/role.guard';
import JwtAuthenticationGuardPracownik from 'src/weryfikacja/guards/jwt-authenticationP.guard';
import RaportService from './raport.service';

@Controller('raport')
export default class RaportController {
  constructor(private readonly raportService: RaportService) {}

  @Get()
  @UseGuards(RoleGuard(Rola.Administrator), RoleGuard(Rola.Sprzedawca))
  wypiszRaporty() {
    return this.raportService.wypiszRaporty();
  }

  @Get('ostatni')
  @UseGuards(RoleGuard(Rola.Administrator), RoleGuard(Rola.Sprzedawca))
  wypiszOstatniRaport() {
    return this.raportService.wypiszOstatniRaport();
  }

  @Post('create/:id')
  @UseGuards(RoleGuard(Rola.Administrator), RoleGuard(Rola.Sprzedawca))
  stworzRaport(@Param('id') id: string) {
    return this.raportService.stworzRaport(Number(id));
  }
}
