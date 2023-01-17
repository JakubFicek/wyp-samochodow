export class WypozyczenieDto {
  id_samochodu: number;
  data_wypozyczenia: Date;
  data_zwrotu: Date;
  id_klienta?: number;
  cena_wypozyczenia?: number;
}
