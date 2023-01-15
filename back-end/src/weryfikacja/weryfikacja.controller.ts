import { Body, Req, Controller, HttpCode, Post, UseGuards, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { RequestPracownik } from 'src/typy/requestPracownik.interface';
import { RequestWithUser } from 'src/typy/requestWithUser.interface';
import RegisterDto from './dto/register.dto';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import JwtAuthenticationGuardPracownik from './guards/jwt-authenticationP.guard';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import { LocalAuthenticationPracownikGuard } from './guards/localAuthenticationPracownik.guard';
import { WeryfikacjaService } from './weryfikacja.service';
 
@Controller('weryfikacja')
@UseInterceptors(ClassSerializerInterceptor)
export class WeryfikacjaController {
  constructor(
    private readonly weryfikacjaService: WeryfikacjaService
  ) {}
 
  @Post('register')
  async register(@Body() daneNowegoKonta: RegisterDto) {
    return this.weryfikacjaService.register(daneNowegoKonta);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post("login")
  logIn(@Req() request: RequestWithUser) {
    const {user} = request;  
    const cookie = this.weryfikacjaService.wezCookieZJwtToken(user.id);
    request.res.setHeader("Set-Cookie", cookie);
    return user;
  }
  //Przy testowaniu i fetchowaniu, trzeba pamietac ze nie ma email i haslo, tylko jest email i password.

  @HttpCode(200)
  @UseGuards(LocalAuthenticationPracownikGuard)
  @Post("pracownik/login")
  LogInPracownik(@Req() request: RequestPracownik) {
    const { user } = request;  
    const cookie = this.weryfikacjaService.wezCookieZJwtToken(user.id);
    request.res.setHeader("Set-Cookie", cookie);
    return user;
  }
  //KLIENT
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.weryfikacjaService.wezCookiePoWylogowaniu());
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  zeryfikuj(@Req() request: RequestWithUser) {
    const klient = request.user;
    return klient;
  }
  //PRACOWNIK
  @UseGuards(JwtAuthenticationGuardPracownik)
  @Post('pracownik/log-out')
  @HttpCode(200)
  async logOutPracownik(@Req() request: RequestPracownik) {
    request.res.setHeader('Set-Cookie', this.weryfikacjaService.wezCookiePoWylogowaniu());
  }

  @UseGuards(JwtAuthenticationGuardPracownik)
  @Get("pracownik")
  zeryfikujPracownika(@Req() request: RequestPracownik) {
    const pracownik = request.user;
    return pracownik;
  }
}