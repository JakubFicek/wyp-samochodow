import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
import Klient from 'src/klient/klient.entity';
import Samochod from 'src/samochod/samochod.entity';
import { Repository } from 'typeorm';
import { RezerwacjaDto } from './dto/rezerwacja.dto';
import Rezerwacja from './rezerwacja.entity';
import SamochodService from 'src/samochod/samochod.service';
import { daty } from 'src/typy/wpis.interface';
import Platnosc from 'src/platnosc/platnosc.entity';
import PlatnoscService from 'src/platnosc/platnosc.service';

@Injectable()
export default class RezerwacjaService {
  constructor(
    @InjectRepository(Rezerwacja)
    public rezerwacjaRepository: Repository<Rezerwacja>,
    @InjectRepository(Samochod)
    public samochodRepository: Repository<Samochod>,
  ) {}

  //dodać do diagramu stworzRezerwacje i usunRezerwacje
  async stworzRezerwacje(rezerwacja: RezerwacjaDto, user: Klient) {
    const d1 = new Date(rezerwacja.data_wypozyczenia);
    const d2 = new Date(rezerwacja.data_zwrotu);
    if (d1.getTime() > d2.getTime()) {
      throw new HttpException('Nieprawidłowe daty', HttpStatus.BAD_GATEWAY);
    }
    //sprawdzanie czy samochod jest dostepny zrobie w samochodzie
    //i podczas wypisywania samochodow wypisze tylko w dostepnym terminie

    const samochod = await this.samochodRepository.findOne({
      where: { id: rezerwacja.id_samochodu },
    });
    if (!samochod) {
      throw new HttpException('Nie ma takiego samochodu', HttpStatus.NOT_FOUND);
    }

    for (let i in samochod.zajete_terminy) {
      let dateW = samochod.zajete_terminy[i][0].getTime();
      let dateO = samochod.zajete_terminy[i][1].getTime();
      if (
        (new Date(rezerwacja.data_wypozyczenia).getTime() < dateW &&
          new Date(rezerwacja.data_zwrotu).getTime() < dateW) ||
        (new Date(rezerwacja.data_wypozyczenia).getTime() > dateO &&
          new Date(rezerwacja.data_zwrotu).getTime() > dateO)
      ) {
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
      new Date(rezerwacja.data_wypozyczenia),
      new Date(rezerwacja.data_zwrotu),
    ]);

    await this.samochodRepository.save(samochod);

    //platnosc
    const dateDiffInDays =
      Math.abs(d1.getTime() - d2.getTime()) / (1000 * 3600 * 24);

    // const zaliczka = Math.ceil(dateDiffInDays * (await samochod).cena_za_dzien);

    // let platnosc: PlatnoscService;
    // platnosc.zaplacZaliczke(zaliczka, rezerwacja.nr_rez);

    await this.samochodRepository.save(samochod);
    //return samochod.zajete_terminy;

    const nowaRezerwacja = await this.rezerwacjaRepository.create({
      ...rezerwacja,
      id_klienta: user.id,
    });
    await this.rezerwacjaRepository.save(nowaRezerwacja);
    return nowaRezerwacja;
  }

  async usunRezerwacje(nr_rez: number) {
    const rezerwacja = await this.znajdzRezerwacje(nr_rez);
    const samochod = await this.samochodRepository.findOne({
      where: { id: rezerwacja.id_samochodu },
    });
    //usuwamy termin przez index 0 -> data_wyp i index 1 -> data_odd
    const warunek = (element: Date[]) =>
      (element = [rezerwacja.data_wypozyczenia, rezerwacja.data_zwrotu]);
    const index = samochod.zajete_terminy.findIndex(warunek);
    samochod.zajete_terminy.splice(index, 1);
    const deleteResponse = await this.rezerwacjaRepository.delete(nr_rez);
    if (!deleteResponse.affected) {
      throw new HttpException(
        'Nie znaleziono wypożyczenia',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async znajdzRezerwacje(nr_rez: number) {
    const rez = await this.rezerwacjaRepository.findOne({
      where: { nr_rez: nr_rez },
    });
    if (rez) {
      return rez;
    }
    throw new HttpException('Nie znaleziono rezerwacji', HttpStatus.NOT_FOUND);
  }

  wypiszRezerwacje(user: Klient) {
    return this.rezerwacjaRepository.find({ where: { id_klienta: user.id } });
  }
}
