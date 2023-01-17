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

@Controller('wypozyczenie')
export default class WypozyczenieController {
  constructor(
    private readonly wypozyczenieService: WypozyczenieService,
    private readonly rezerwacjaService: RezerwacjaService,
  ) {}

  @Get('znajdz/:id')
  async znajdzWypozyczenie(@Param('id') id: string) {
    return this.wypozyczenieService.znajdzWypozyczenie(Number(id));
  }

  @Post('create')
  @UseGuards(JwtAuthenticationGuard)
  async stworzWypozyczenie(@Body() wypozyczenie: WypozyczenieDto, @Req() request: RequestWithUser) {
    return this.wypozyczenieService.stworzWypozyczenie(wypozyczenie, request.user);
  }

  @Delete(':id')
  async usunWypozyczenie(@Param('id') id: string) {
    return this.wypozyczenieService.usunWypozyczenie(Number(id));
  }

  @Post('zrezerwacji/:id')
  async stworzWypozyczenieZRezerwacji(@Param('id') id: string) {
    if (this.rezerwacjaService.znajdzRezerwacje(Number(id))) {
      return this.wypozyczenieService.stworzWypozyczenieZRezerwacji(Number(id));
    } else return this.rezerwacjaService.znajdzRezerwacje(Number(id));
  }
}
