export class SamochodDto {
  marka: string;
  model: string;
  rok_produkcji: number;
  przebieg: number;
  cena_za_dzien: number;
  il_miejsc: number;
  stan_pojazdu: string;
  ksiazka_serwisowa: string;
  czy_sprawdzony: boolean;
  zajete_terminy: Date[][]; //[["2022-08-08T10:00:00Z","2022-08-10T12:00:00Z"]] dodawanie daty
}
