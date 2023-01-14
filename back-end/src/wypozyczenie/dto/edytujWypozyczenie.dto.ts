import Samochod from 'src/samochod/samochod.entity';
import Klient from 'src/klient/klient.entity';

export class edytujWypozyczenieDto {
  nr_wyp?: number;
  id_samochodu?: number;
  data_wypozyczenia?: Date;
  data_zwrotu?: Date;
  id_klienta?: number;
}
