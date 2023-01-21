import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import Rola from 'src/pracownicy/enum/role.enum';
import RoleGuard from 'src/pracownicy/guard/role.guard';
import { wpis } from 'src/typy/wpis.interface';
import { daty } from 'src/typy/wpis.interface';
import JwtAuthenticationGuard from 'src/weryfikacja/guards/jwt-authentication.guard';
import { edytujSamochodDto } from './dto/edytujSamochod.dto';
import { SamochodDto } from './dto/samochod.dto';
import SamochodService from './samochod.service';

@Controller('samochod')
export default class SamochodController {
  constructor(private readonly samochodService: SamochodService) {}

  @Get()
  wypiszSamochody() {
    return this.samochodService.wypiszSamochody();
  }

  @Get('dostepne')
  wypiszDostepneSamochody() {
    return this.samochodService.wypiszDostepneSamochody();
  }

  @Get('dostepnewterminie')
  async wypiszDostepneSamochodyWTerminie(@Body() dwieDaty: daty) {
    return this.samochodService.wypiszDostepneSamochodyWTerminie(dwieDaty);
  }

  @Get(':id')
  async zwrocStan(@Param('id') id: string) {
    return this.samochodService.zwrocStan(Number(id));
  }

  @Post()
  async dodaj_samochod(@Body() samochod: SamochodDto) {
    return this.samochodService.dodaj_samochod(samochod);
  }

  @Patch('zwrot/:id')
  @UseGuards(JwtAuthenticationGuard) //sprzedawca
  async zwrotDoPrzegladu(
    @Param('id') id: string,
    //@Body() samochod: edytujSamochodDto,
  ) {
    return this.samochodService.zwrotDoPrzegladu(Number(id) /*, samochod*/);
  }

  @Patch('stan/:id')
  async zmienStan(
    @Param('id') id: string,
    @Body() samochod: edytujSamochodDto,
  ) {
    return this.samochodService.zmienStan(Number(id), samochod);
  }

  @Patch('doserwisanta/:id')
  @UseGuards(JwtAuthenticationGuard) //serwisant
  async doNaprawy(@Param('id') id: string) {
    return this.samochodService.serwis(Number(id));
  }

  @Patch('napraw/:id')
  @UseGuards(JwtAuthenticationGuard) //serwisant
  async napraw(@Param('id') id: string) {
    return this.samochodService.zepsuty(Number(id));
  }

  @Patch('ksiazka/:id')
  @UseGuards(JwtAuthenticationGuard) //serwisant
  async edytujKsiazkeSerwisowa(
    @Param('id') id: string,
    @Body() nowyWpis: wpis,
  ) {
    return this.samochodService.edytujKsiazkeSerwisowa(Number(id), nowyWpis);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard) //admin
  async usun_samochod(@Param('id') id: string) {
    return this.samochodService.usun_samochod(Number(id));
  }
}
