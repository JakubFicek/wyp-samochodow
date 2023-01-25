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
import { id } from 'src/typy/wpis.interface';
import JwtAuthenticationGuardPracownik from 'src/weryfikacja/guards/jwt-authenticationP.guard';

@Controller('wypozyczenie')
export default class WypozyczenieController {
  constructor(
    private readonly wypozyczenieService: WypozyczenieService,
    private readonly rezerwacjaService: RezerwacjaService,
  ) {}

  @Get('znajdz/:id')
  @UseGuards(JwtAuthenticationGuard || JwtAuthenticationGuardPracownik)
  //dostep do wypozyczenia bedzie miec klient, sprzedawca i administrator
  async znajdzWypozyczenie(@Param('id') id: string) {
    return this.wypozyczenieService.znajdzWypozyczenie(Number(id));
  }

  @Get()
  async wypiszWszystkieWypozyczenia() {
    return this.wypozyczenieService.wypiszWszystkieWypozyczenia();
  }

  @Get('wypisz')
  @UseGuards(JwtAuthenticationGuard)
  async wypiszWypozyczenia(@Req() request: RequestWithUser) {
    return this.wypozyczenieService.wypiszWypozyczenia(request.user);
  }

  @Post('create')
  @UseGuards(JwtAuthenticationGuardPracownik)
  async stworzWypozyczenie(@Body() wypozyczenie: WypozyczenieDto) {
    return this.wypozyczenieService.stworzWypozyczenie(wypozyczenie);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuardPracownik)
  //dostep do usuniecia wypozyczenia bedzie miec sprzedawca i admin
  async usunWypozyczenie(@Param('id') id: string) {
    return this.wypozyczenieService.usunWypozyczenie(Number(id));
  }

  @Post('zrezerwacji/:id')
  @UseGuards(JwtAuthenticationGuardPracownik)
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
