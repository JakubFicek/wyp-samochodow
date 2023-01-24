import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import PracownikService from 'src/pracownicy/service/pracownik.service';
import { TokenPayloadPracownik } from 'src/typy/tokenPayloadPracownik.interface';
 
@Injectable()
export class JwtStrategyPracownik extends PassportStrategy(Strategy, "jwtPracownik") {
  constructor(
    private readonly configService: ConfigService,
    private readonly pracownikService: PracownikService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication2;
      }]),
      secretOrKey: configService.get('JWT_SECRET')
    });
  }
 
  async validate(payload: TokenPayloadPracownik) {
    return this.pracownikService.znajdzPoId(payload.pracownikId);
  }
}