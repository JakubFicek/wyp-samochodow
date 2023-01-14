export class RaportDto {
  il_wypozyczen: number;
  kto_sporzadzil: string; //wstępnie string ale zmienic typ na Sprzedawca
  wszystkie_wypozyczenia: string; //wstępnie string ale zmienic na Wypozyczenie
  wszystkie_rezerwacje: string; //wstępnie string ale zmienic na Rezerwacje

  przychod: number; //moze zrobic arrajke z elementami zawier. datę i przychod
  calkowity_zysk: number;
}
