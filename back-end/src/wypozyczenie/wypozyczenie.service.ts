import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Klient from 'src/klient/klient.entity';
import Rezerwacja from 'src/rezerwacja/rezerwacja.entity';
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
    @InjectRepository(Rezerwacja)
    public rezerwacjaRepository: Repository<Rezerwacja>,
    @InjectRepository(Klient)
    public klientRepository: Repository<Klient>,
  ) {}

  //funkcja wyszukująca wypożyczenie po numerze wypożyczenia
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
  async wypiszWszystkieWypozyczenia() {
    const wypozyczenia = await this.wypozyczenieRepository.find();
    return wypozyczenia;
  }

  //funkcja wypisująca wypożyczenia dla danego zalogowanego klienta
  async wypiszWypozyczenia(user: Klient) {
    const wypozyczenia = await this.wypozyczenieRepository.find({
      where: { id_klienta: user.id },
    });
    return wypozyczenia;
  }

  //dodac metode do diagramu klas
  //funkcja tworząca wypożyczenie dla danego zalogowanego klienta
  async stworzWypozyczenie(wypozyczenie: WypozyczenieDto) {
    const d1 = new Date(wypozyczenie.data_wypozyczenia);
    const d2 = new Date(wypozyczenie.data_zwrotu);
    if (d1.getTime() > d2.getTime()) {
      throw new HttpException('Nieprawidłowe daty', HttpStatus.BAD_GATEWAY);
    }
    //format wpisania: RRRR-MM-DDTHH:MM:SSZ

    const samochod = await this.samochodRepository.findOne({
      where: { id: wypozyczenie.id_samochodu },
    });
    if (!samochod) {
      throw new HttpException('Nie ma takiego samochodu', HttpStatus.NOT_FOUND);
    }

    for (let i in samochod.zajete_terminy) {
      let dateW = samochod.zajete_terminy[i][0].getTime();
      let dateO = samochod.zajete_terminy[i][1].getTime();
      //console.log(new Date(wypozyczenie.data_wypozyczenia));
      if (
        (new Date(wypozyczenie.data_wypozyczenia).getTime() < dateW &&
          new Date(wypozyczenie.data_zwrotu).getTime() < dateW) ||
        (new Date(wypozyczenie.data_wypozyczenia).getTime() > dateO &&
          new Date(wypozyczenie.data_zwrotu).getTime() > dateO)
      ) {
        console.log(samochod.zajete_terminy);
        //jesli tak, to samochod jest dostepny
      } else {
        throw new HttpException(
          'Samochod nie jest dostepny w tym terminie',
          HttpStatus.CONFLICT,
        );
      }
    }

    //dodajemy termin przez index 0 -> data_wyp i index 1 -> data_odd
    samochod.zajete_terminy.push([
      new Date(wypozyczenie.data_wypozyczenia),
      new Date(wypozyczenie.data_zwrotu),
    ]);

    //await this.samochodRepository.save(samochod);
    await this.samochodRepository.update(samochod.id, {
      ...samochod,
      zajete_terminy: samochod.zajete_terminy,
    });

    console.log(samochod.zajete_terminy);
    const dateDiffInDays =
      Math.abs(d1.getTime() - d2.getTime()) / (1000 * 3600 * 24);

    wypozyczenie.cena_wypozyczenia = Math.ceil(
      dateDiffInDays * (await samochod).cena_za_dzien,
    );
    //console.log(user);
    const noweWypozyczenie = await this.wypozyczenieRepository.create({
      ...wypozyczenie,
    });
    await this.wypozyczenieRepository.save(noweWypozyczenie);

    //platnosc
    // let platnosc: PlatnoscService;
    // platnosc.platnosc(
    //   noweWypozyczenie.cena_wypozyczenia,
    //   noweWypozyczenie.nr_wyp,
    // );

    return noweWypozyczenie;
  }

  //funkcja usuwająca wypożyczenie po wypożyczeniu. nie jest brany nr klienta, ponieważ tylko sprzedawca i admin mogą usuwać.
  async usunWypozyczenie(nr_wyp: number) {
    const wypozyczenie = await this.znajdzWypozyczenie(nr_wyp);
    const samochod = await this.samochodRepository.findOne({
      where: { id: wypozyczenie.id_samochodu },
    });
    //usuwamy termin przez index 0 -> data_wyp i index 1 -> data_odd
    const warunek = (element: Date[]) =>
      element.toString() ==
      [wypozyczenie.data_wypozyczenia, wypozyczenie.data_zwrotu].toString();

    const index = samochod.zajete_terminy.findIndex(warunek);
    samochod.zajete_terminy.splice(index, 1);
    this.samochodRepository.save(samochod);

    const deleteResponse = await this.wypozyczenieRepository.delete(nr_wyp);
    if (!deleteResponse.affected) {
      throw new HttpException(
        'Nie znaleziono wypożyczenia',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //funkcja tworząca wypożyczenie z istniejącej już rezerwacji, klient podaje jedynie nr_rez
  async stworzWypozyczenieZRezerwacji(nr_rez: number, user_id: number) {
    const rezerwacja = await this.rezerwacjaRepository.findOne({
      where: { nr_rez, id_klienta: user_id },
    });
    if (!rezerwacja) {
      throw new HttpException(
        'Nie znaleziono rezerwacji',
        HttpStatus.NOT_FOUND,
      );
    }

    const d1 = new Date(rezerwacja.data_wypozyczenia);
    const d2 = new Date(rezerwacja.data_zwrotu);
    //format wpisania: RRRR-MM-DDTHH:MM:SSZ

    const dateDiffInDays =
      Math.abs(d1.getTime() - d2.getTime()) / (1000 * 3600 * 24);

    const samochod = this.samochodRepository.findOne({
      where: { id: rezerwacja.id_samochodu },
    });

    const r_cena_wypozyczenia = Math.ceil(
      dateDiffInDays * (await samochod).cena_za_dzien,
    );

    const noweWypozyczenie = await this.wypozyczenieRepository.create({
      id_samochodu: rezerwacja.id_samochodu,
      data_wypozyczenia: rezerwacja.data_wypozyczenia,
      data_zwrotu: rezerwacja.data_zwrotu,
      id_klienta: rezerwacja.id_klienta,
      cena_wypozyczenia: r_cena_wypozyczenia,
    });
    await this.wypozyczenieRepository.save(noweWypozyczenie);

    this.rezerwacjaRepository.delete(rezerwacja);

    return noweWypozyczenie;
  }
}
