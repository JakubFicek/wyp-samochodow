import { Request } from 'express';
import Klient from 'src/klient/klient.entity';
 
interface RequestKlienta extends Request {
  klient: Klient;
}
 
export default RequestKlienta;