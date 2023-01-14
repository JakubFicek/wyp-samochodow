import { Request } from 'express';
import Klient from 'src/klient/klient.entity';
 
export interface RequestWithUser extends Request {
  klient: Klient;
}
 