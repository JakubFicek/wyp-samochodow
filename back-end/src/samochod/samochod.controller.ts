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
import { wpis } from 'src/typy/wpis.interface';
import { daty } from 'src/typy/wpis.interface';
import JwtAuthenticationGuardPracownik from 'src/weryfikacja/guards/jwt-authenticationP.guard';
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

  @Post('dostepnewterminie')
  async wypiszDostepneSamochodyWTerminie(@Body() dwieDaty: daty) {
    return this.samochodService.wypiszDostepneSamochodyWTerminie(dwieDaty);
  }

  @Get('jeden/:id')
  async zwrocJedenSamochod(@Param('id') id: string) {
    return this.samochodService.zwrocJeden(Number(id));
  }

  @Get(':id')
  async zwrocStan(@Param('id') id: string) {
    return this.samochodService.zwrocStan(Number(id));
  }

  @Post()
  async dodaj_samochod(@Body() samochod: SamochodDto) {
    return await this.samochodService.dodaj_samochod(samochod);
  }

  @Patch('zwrot/:id')
  @UseGuards(JwtAuthenticationGuardPracownik) //sprzedawca
  async zwrotDoPrzegladu(
    @Param('id') id: string,
    //@Body() samochod: edytujSamochodDto,
  ) {
    return await this.samochodService.zwrotDoPrzegladu(
      Number(id) /*, samochod*/,
    );
  }

  @Patch('stan/:id')
  async zmienStan(
    @Param('id') id: string,
    @Body() samochod: edytujSamochodDto,
  ) {
    return this.samochodService.zmienStan(Number(id), samochod);
  }

  @Patch('doserwisanta/:id')
  @UseGuards(JwtAuthenticationGuardPracownik) //serwisant
  async doNaprawy(@Param('id') id: string) {
    return this.samochodService.serwis(Number(id));
  }

  @Patch('donaprawy/:id')
  @UseGuards(JwtAuthenticationGuardPracownik) //serwisant
  async napraw(@Param('id') id: string) {
    return this.samochodService.zepsuty(Number(id));
  }

  @Patch('ksiazka/:id')
  @UseGuards(JwtAuthenticationGuardPracownik) //serwisant
  async edytujKsiazkeSerwisowa(
    @Param('id') id: string,
    @Body() nowyWpis: wpis,
  ) {
    return this.samochodService.edytujKsiazkeSerwisowa(Number(id), nowyWpis);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuardPracownik) //admin
  async usun_samochod(@Param('id') id: string) {
    return this.samochodService.usun_samochod(Number(id));
  }
}
