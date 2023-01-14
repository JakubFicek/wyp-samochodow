import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get } from '@nestjs/common';
import RequestKlienta from 'src/typy/requestKlienta.interface';
import RegisterDto from './dto/register.dto';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import { LocalAuthenticationGuard } from './guards/localWeryfikacja.guard';
import { WeryfikacjaService } from './weryfikacja.service';
 
@Controller('weryfikacja')
export class WeryfikacjaController {
  constructor(
    private readonly weryfikacjaService: WeryfikacjaService
  ) {}
 
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.weryfikacjaService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post("log-in")
  LogIn(@Req() request: RequestKlienta) {
    const { klient } = request;  
    const cookie = this.weryfikacjaService.getCookieWithJwtToken(klient.id);
    request.res.setHeader("Set-Cookie", cookie);
    return klient;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestKlienta) {
    request.res.setHeader('Set-Cookie', this.weryfikacjaService.getCookieForLogOut());
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestKlienta) {
    const klient = request.klient;
    return klient;
  }
}