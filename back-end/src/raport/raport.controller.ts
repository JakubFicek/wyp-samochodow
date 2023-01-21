import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import Rola from 'src/pracownicy/enum/role.enum';
import RoleGuard from 'src/pracownicy/guard/role.guard';
import { RequestPracownik } from 'src/typy/requestPracownik.interface';
import JwtAuthenticationGuardPracownik from 'src/weryfikacja/guards/jwt-authenticationP.guard';
import RaportService from './raport.service';

@Controller('raport')
export default class RaportController {
  constructor(private readonly raportService: RaportService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuardPracownik)
  wypiszRaporty() {
    return this.raportService.wypiszRaporty();
  }

  @Get('ostatni')
  @UseGuards(JwtAuthenticationGuardPracownik)
  wypiszOstatniRaport() {
    return this.raportService.wypiszOstatniRaport();
  }

  @Post('create')
  @UseGuards(JwtAuthenticationGuardPracownik)
  stworzRaport(@Req() request: RequestPracownik) {
    return this.raportService.stworzRaport(request.user);
  }
}
