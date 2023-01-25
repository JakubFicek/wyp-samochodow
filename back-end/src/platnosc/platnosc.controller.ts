import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { RequestWithUser } from 'src/typy/requestWithUser.interface';
import PlatnoscService from './platnosc.service';
import JwtAuthenticationGuard from 'src/weryfikacja/guards/jwt-authentication.guard';

@Controller('platnosc')
export default class PlatnoscController {
  constructor(private readonly platnoscService: PlatnoscService) {}

  @Post('zaliczka')
  @UseGuards(JwtAuthenticationGuard)
  async platnosc(@Req() request: RequestWithUser, @Body() numer_blik: number) {
    return this.platnoscService.zaplacZaliczke(request.user, numer_blik);
  }
}
