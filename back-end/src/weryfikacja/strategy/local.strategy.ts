import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { WeryfikacjaService } from '../weryfikacja.service';
import Klient from 'src/klient/klient.entity';
 
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private weryfikacjaService: WeryfikacjaService) {
    super({
      poleKlienta: 'email'
    });
  }
  
  async validate(email: string, password: string): Promise<Klient> {
    return this.weryfikacjaService.getAuthenticatedUser(email, password);
  }
}