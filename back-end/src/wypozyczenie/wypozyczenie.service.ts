import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
import Klient from 'src/klient/klient.entity';
import Samochod from 'src/samochod/samochod.entity';
import { Repository } from 'typeorm';
import { WypozyczenieDto } from './dto/wypozyczenie.dto';
import Wypozyczenie from './wypozyczenie.entity';

@Injectable()
export default class WypozyczenieService {
  constructor(
    @InjectRepository(Wypozyczenie)
    public wypozyczenieRepository: Repository<Wypozyczenie>,
    @InjectRepository(Samochod)
    public samochodRepository: Repository<Samochod>,
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

  //dodac metode do diagramu klas
  async stworzWypozyczenie(wypozyczenie: WypozyczenieDto) {
    const d1 = new Date(wypozyczenie.data_wypozyczenia);
    const d2 = new Date(wypozyczenie.data_zwrotu);
    //format wpisania: RRRR-MM-DDTHH:MM:SSZ

    const dateDiffInDays =
      Math.abs(d1.getTime() - d2.getTime()) / (1000 * 3600 * 24);

    const samochod = this.samochodRepository.findOne({
      where: { id: wypozyczenie.id_samochodu },
    });

    wypozyczenie.cena_wypozyczenia = Math.ceil(
      dateDiffInDays * (await samochod).cena_za_dzien,
    );

    const noweWypozyczenie = await this.wypozyczenieRepository.create(
      wypozyczenie,
    );
    await this.wypozyczenieRepository.save(noweWypozyczenie);
    return noweWypozyczenie;
  }

  async usunWypozyczenie(nr_wyp: number) {
    const deleteResponse = await this.wypozyczenieRepository.delete(nr_wyp);
    if (!deleteResponse.affected) {
      throw new HttpException(
        'Nie znaleziono wypożyczenia',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async sprawdzRezerwacje(/*nr_wyp: number*/) {
    //sprawdzic czy istnieje rezerwacja o takim nr wypozyczenia.
    //
    //stworzyc nr wypozyczenia,
    //stworzyc system przekazania danych z rezerwacji do wypozyczenia: stworzWypozyczenieZRezerwacji() ...
    //itd
    //
    //
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
