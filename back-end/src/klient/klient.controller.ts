import { Controller, Get, Param } from '@nestjs/common';
import KlientService from './klient.service';

@Controller('klient')
export default class KlientController {
  constructor(private readonly klientService: KlientService) {}

  @Get('weryfikacja/:id')
  async weryfikacja_danych(@Param('id') id: string) {
    return this.klientService.weryfikacja_danych(Number(id));
  }

  @Get('historia/:id')
  async historia(@Param('id') id: string) {
    return this.klientService.historiaKlienta(Number(id));
  }

  //reszta metod jest chyba bez sensu, wszystko zaimplementowane w innych klasach
}
