import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import EdytujPracownikaDto from "../dto/edytujPracownika.dto";
import NowyPracownikDto from "../dto/nowyPracownik.dto";
import PracownikService from "../service/pracownik.service";

@Controller('pracownik')
export default class PracownikController {
  constructor(private readonly pracownikService: PracownikService){ } 

  @Post('create')
  async dodaj_pracownika(@Body() daneNowegoPracownika: NowyPracownikDto) {
    return this.pracownikService.dodaj_pracownika(daneNowegoPracownika);
  }

  @Patch(':id')
  async edytuj_pracownika(
    @Param('id') id: string,
    @Body() noweDane: EdytujPracownikaDto,
  ) {
    return this.pracownikService.edytuj_pracownika(Number(id), noweDane);
  }

  @Delete(':id')
  async usun_samochod(@Param('id') id: string) {
    return this.pracownikService.usun_pracownika(Number(id));
  }
}