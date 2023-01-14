export class RezerwacjaDto {
  nr_rez: number;
  id_samochodu: number;
  data_wypozyczenia: Date; //w dacie wypozyczenia mozemy uwzglednic
  //godzine odbioru ze wzgledu na to ze date zawiera w sobie rowniez
  //godzine. trzeba moze jedynie extract z tej daty zrobic po samą godzinę.
  data_zwrotu: Date;
  id_klienta: number;
  //godzina_odbioru: Date;
}
