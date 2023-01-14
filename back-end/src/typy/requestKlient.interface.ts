import { Request } from 'express';
import Klient from 'src/klient/klient.entity';
 
export interface RequestKlient extends Request {
  klient: Klient;
}
 