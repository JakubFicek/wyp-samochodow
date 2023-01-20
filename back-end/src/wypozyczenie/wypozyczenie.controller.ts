import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from 'src/typy/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/weryfikacja/guards/jwt-authentication.guard';
import { WypozyczenieDto } from './dto/wypozyczenie.dto';
import WypozyczenieService from './wypozyczenie.service';
import RezerwacjaService from 'src/rezerwacja/rezerwacja.service';
import RoleGuard from 'src/pracownicy/guard/role.guard';
import Rola from 'src/pracownicy/enum/role.enum';
import { id } from 'src/typy/wpis.interface';

@Controller('wypozyczenie')
export default class WypozyczenieController {
  constructor(
    private readonly wypozyczenieService: WypozyczenieService,
    private readonly rezerwacjaService: RezerwacjaService,
  ) {}

  @Get('znajdz/:id')
  @UseGuards(
    JwtAuthenticationGuard,
    RoleGuard(Rola.Administrator),
    RoleGuard(Rola.Sprzedawca),
  )
  //dostep do wypozyczenia bedzie miec klient, sprzedawca i administrator
  async znajdzWypozyczenie(@Param('id') id: string) {
    return this.wypozyczenieService.znajdzWypozyczenie(Number(id));
  }

  @Get('wypisz')
  @UseGuards(JwtAuthenticationGuard)
  //dostep do wypozyczenia bedzie miec klient
  async wypiszWypozyczenia(@Req() request: RequestWithUser) {
    return this.wypozyczenieService.wypiszWypozyczenia(request.user);
  }

  @Post('create')
  @UseGuards(RoleGuard(Rola.Sprzedawca))
  async stworzWypozyczenie(
    @Body() wypozyczenie: WypozyczenieDto,
    @Body() id_klienta: id,
  ) {
    return this.wypozyczenieService.stworzWypozyczenie(
      wypozyczenie,
      id_klienta.id_klienta,
    );
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Rola.Administrator), RoleGuard(Rola.Sprzedawca))
  //dostep do usuniecia wypozyczenia bedzie miec sprzedawca i admin
  async usunWypozyczenie(@Param('id') id: string) {
    return this.wypozyczenieService.usunWypozyczenie(Number(id));
  }

  @Post('zrezerwacji/:id')
  @UseGuards(RoleGuard(Rola.Sprzedawca))
  //tylko klient
  async stworzWypozyczenieZRezerwacji(
    @Param('id') id: string,
    @Body() id_klienta: id,
  ) {
    return this.wypozyczenieService.stworzWypozyczenieZRezerwacji(
      Number(id),
      id_klienta.id_klienta,
    );
  }
}
