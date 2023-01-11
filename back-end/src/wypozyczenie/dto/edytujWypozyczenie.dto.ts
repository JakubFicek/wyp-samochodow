import Samochod from 'src/samochod/samochod.entity';
import Klient from 'src/klient/klient.entity';

export class edytujWypozyczenieDto {
  samochod?: Samochod;
  data_wypozyczenia?: Date;
  data_zwrotu?: Date;
  przez_kogo?: Klient;
  nr_wyp?: number;
}
