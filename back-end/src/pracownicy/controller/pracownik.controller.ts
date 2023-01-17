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
import Email from 'src/typy/email.interface';
import EdytujPracownikaDto from '../dto/edytujPracownika.dto';
import NowyPracownikDto from '../dto/nowyPracownik.dto';
import Rola from '../enum/role.enum';
import RoleGuard from '../guard/role.guard';
import PracownikService from '../service/pracownik.service';

@Controller('pracownik')
export default class PracownikController {
  constructor(private readonly pracownikService: PracownikService) {}

  @Get("sprzedawca")
  async zwrocSprzedawcow(){
    return this.pracownikService.zwrocSprzedawcow();
  }
  @Get("serwisant")
  async zwrocSerwisantow(){
    return this.pracownikService.zwrocSerwisantow();
  }
  
  @Post('create')
  @UseGuards(RoleGuard(Rola.Administrator))
  async dodaj_pracownika(@Body() daneNowegoPracownika: NowyPracownikDto) {
    return this.pracownikService.dodaj_pracownika(daneNowegoPracownika);
  }

  @Patch(':id')
  @UseGuards(RoleGuard(Rola.Administrator))
  async edytuj_pracownika(
    @Param('id') id: string,
    @Body() noweDane: EdytujPracownikaDto,
  ) {
    return this.pracownikService.edytuj_pracownika(Number(id), noweDane);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Rola.Administrator))
  async usun_pracownika(@Param('id') id: string) {
    return this.pracownikService.usun_pracownika(Number(id));
  }
}
