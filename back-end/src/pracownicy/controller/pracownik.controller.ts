import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import EdytujPracownikaDto from '../dto/edytujPracownika.dto';
import NowyPracownikDto from '../dto/nowyPracownik.dto';
import PracownikService from '../service/pracownik.service';

@Controller('pracownik')
export default class PracownikController {
  constructor(private readonly pracownikService: PracownikService) {}

  @Post('create')
  async dodaj_pracownika(@Body() daneNowegoPracownika: NowyPracownikDto) {
    return this.pracownikService.dodaj_pracownika(daneNowegoPracownika);
  }

  @Patch('edytuj')
  async edytuj_pracownika(@Body() noweDane: EdytujPracownikaDto) {
    return this.pracownikService.edytuj_pracownika(noweDane.email, noweDane);
  }

  @Delete('delete')
  async usun_pracownika(@Body() email: string) {
    //nazywalo sie usun_samochod
    return this.pracownikService.usun_pracownika(email);
  }
}
