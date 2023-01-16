export class RaportDto {
  id: number;
  il_wypozyczen: number;
  kto_sporzadzil: number; //wstępnie string ale zmienic typ na Sprzedawca
  wszystkie_wypozyczenia: string; //wstępnie string ale zmienic na Wypozyczenie
  wszystkie_rezerwacje: string; //wstępnie string ale zmienic na Rezerwacje
  data_stworzenia: Date;

  przychod: number;
}
