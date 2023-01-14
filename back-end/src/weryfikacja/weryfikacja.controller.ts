import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { RequestKlient } from 'src/typy/requestKlient.interface';
import RegisterDto from './dto/register.dto';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
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
  LogIn(@Req() request: RequestKlient) {
    const { klient } = request;  
    const cookie = this.weryfikacjaService.wezCookieZJwtToken(klient.id);
    request.res.setHeader("Set-Cookie", cookie);
    return klient;
  }
  //Przy testowaniu i fetchowaniu, trzeba pamietac ze nie ma email i haslo, tylko jest email i password.
  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestKlient) {
    request.res.setHeader('Set-Cookie', this.weryfikacjaService.wezCookiePoWylogowaniu());
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  zeryfikuj(@Req() request: RequestKlient) {
    const klient = request.user;
    return klient;
  }
}