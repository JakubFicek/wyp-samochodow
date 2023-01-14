import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
import Klient from 'src/klient/klient.entity';
import { Repository } from 'typeorm';
import Wypozyczenie from './wypozyczenie.entity';

@Injectable()
export default class WypozyczenieService {
  constructor(
    @InjectRepository(Wypozyczenie)
    public wypozyczenieRepository: Repository<Wypozyczenie>,
  ) {}

  znajdzWypozyczenie(nr_wyp: number) {
    const wypo = this.wypozyczenieRepository.findOne({ where: { nr_wyp } });
    if (wypo) {
      return wypo;
    }
    throw new HttpException(
      'Nie znaleziono wypożyczenia',
      HttpStatus.NOT_FOUND,
    );
  }

  //FUNKCJA POD TYM JEST ZUPEŁNIE BEZ SENSU W WYPOŻYCZENIU!
  //Dodam metodę do klienta
  //sprawdzHistorieKlienta(k: Klient) {
  // dodać historię do klienta
  //}

  //TAK SAMO TUTAJ
  //Nie mam zielonego pojęcia jak technicznie masz sprawdzać
  //historię danego wypożyczenia.
  //sprawdzHistorie() {
  //nie wiem co tutaj
  //}
}
