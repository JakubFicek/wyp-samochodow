import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { RequestWithUser } from 'src/typy/requestWithUserinterface';
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
  async register(@Body() registrationData: RegisterDto) {
    return this.weryfikacjaService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post("login")
  LogIn(@Req() request: RequestWithUser) {
    const { klient } = request;  
    const cookie = this.weryfikacjaService.getCookieWithJwtToken(klient.id);
    request.res.setHeader("Set-Cookie", cookie);
    return klient;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.weryfikacjaService.getCookieForLogOut());
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const klient = request.user;
    return klient;
  }
}