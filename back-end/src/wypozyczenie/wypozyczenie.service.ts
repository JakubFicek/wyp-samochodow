import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
import Klient from 'src/klient/klient.entity';
import { RezerwacjaDto } from 'src/rezerwacja/dto/rezerwacja.dto';
import Rezerwacja from 'src/rezerwacja/rezerwacja.entity';
import Samochod from 'src/samochod/samochod.entity';
import { Repository } from 'typeorm';
import { WypozyczenieDto } from './dto/wypozyczenie.dto';
import Wypozyczenie from './wypozyczenie.entity';
import PlatnoscService from 'src/platnosc/platnosc.service';

@Injectable()
export default class WypozyczenieService {
  constructor(
    @InjectRepository(Wypozyczenie)
    public wypozyczenieRepository: Repository<Wypozyczenie>,
    @InjectRepository(Samochod)
    public samochodRepository: Repository<Samochod>,
    @InjectRepository(Rezerwacja)
    public rezerwacjaRepository: Repository<Rezerwacja>,
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

    const samochod = await this.samochodRepository.findOne({
      where: { id: wypozyczenie.id_samochodu },
    });

    for (let i in samochod.zajete_terminy) {
      let dateW = samochod.zajete_terminy[i][0].getTime();
      let dateO = samochod.zajete_terminy[i][1].getTime();
      if (
        (new Date(wypozyczenie.data_wypozyczenia).getTime() < dateW &&
          new Date(wypozyczenie.data_zwrotu).getTime() < dateW) ||
        (new Date(wypozyczenie.data_wypozyczenia).getTime() > dateO &&
          new Date(wypozyczenie.data_zwrotu).getTime() > dateO)
      ) {
        //jesli tak, to samochod jest dostepny
        return samochod;
      }
      throw new HttpException(
        'Samochod nie jest dostepny w tym terminie',
        HttpStatus.CONFLICT,
      );
    }

    const dateDiffInDays =
      Math.abs(d1.getTime() - d2.getTime()) / (1000 * 3600 * 24);

    wypozyczenie.cena_wypozyczenia = Math.ceil(
      dateDiffInDays * (await samochod).cena_za_dzien,
    );

    const noweWypozyczenie = await this.wypozyczenieRepository.create(
      wypozyczenie,
    );

    //platnosc
    let platnosc: PlatnoscService;
    platnosc.platnosc(wypozyczenie.cena_wypozyczenia, wypozyczenie.nr_wyp);

    await this.wypozyczenieRepository.save(noweWypozyczenie);
    return noweWypozyczenie;
  }

  async usunWypozyczenie(nr_wyp: number) {
    const wypozyczenie = await this.znajdzWypozyczenie(nr_wyp);
    const samochod = await this.samochodRepository.findOne({
      where: { id: wypozyczenie.id_samochodu },
    });
    //usuwamy termin przez index 0 -> data_wyp i index 1 -> data_odd
    const warunek = (element: Date[]) =>
      (element = [wypozyczenie.data_wypozyczenia, wypozyczenie.data_zwrotu]);
    const index = samochod.zajete_terminy.findIndex(warunek);
    samochod.zajete_terminy.splice(index, 1);
    const deleteResponse = await this.wypozyczenieRepository.delete(nr_wyp);
    if (!deleteResponse.affected) {
      throw new HttpException(
        'Nie znaleziono wypożyczenia',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async stworzWypozyczenieZRezerwacji(nr_rez: number) {
    const rezerwacja = await this.rezerwacjaRepository.findOne({
      where: { nr_rez },
    });
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

    //platnosc
    let platnosc: PlatnoscService;
    platnosc.platnoscReszty(
      noweWypozyczenie.cena_wypozyczenia,
      noweWypozyczenie.nr_wyp,
    );
    return noweWypozyczenie;
  }
}
