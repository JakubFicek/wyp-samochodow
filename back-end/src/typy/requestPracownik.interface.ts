import { Request } from 'express';
import { Pracownik } from 'src/pracownicy/entity/pracownik.entity';
 
export interface RequestPracownik extends Request {
  user: Pracownik;
}