import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import KlientService from 'src/klient/klient.service';
import { TokenPayload } from 'src/typy/tokenPayload.interface';
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly klientService: KlientService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication1;
      }]),
      secretOrKey: configService.get('JWT_SECRET')
    });
  }
 
  async validate(payload: TokenPayload) {
    return this.klientService.znajdzPoId(payload.klientId);
  }
}