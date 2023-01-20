import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Pracownik from 'src/pracownicy/entity/pracownik.entity';
import Rezerwacja from 'src/rezerwacja/rezerwacja.entity';
import Wypozyczenie from 'src/wypozyczenie/wypozyczenie.entity';
import { Repository } from 'typeorm';
import Raport from './raport.entity';

@Injectable()
export default class RaportService {
  constructor(
    @InjectRepository(Raport)
    private raportRepository: Repository<Raport>,
    @InjectRepository(Wypozyczenie)
    private wypozyczenieRepository: Repository<Wypozyczenie>,
    @InjectRepository(Rezerwacja)
    private rezerwacjaRepository: Repository<Rezerwacja>,
  ) {}

  async stworzRaport(kto: Pracownik) {
    const teraz = new Date();
    const ostatniMiesiac = new Date(new Date().setDate(teraz.getDate() - 30));

    let a_wszystkie_wypozyczenia = await this.wypozyczenieRepository.find();
    let a_wszystkie_rezerwacje = await this.rezerwacjaRepository.find();

    const getDays = (a: Date, b: Date) => {
      return (a.getTime() - b.getTime()) / (1000 * 3600 * 24);
    };

    //return a_wszystkie_wypozyczenia[0];
    //return (
    //  getDays(a_wszystkie_wypozyczenia[4].data_wypozyczenia, ostatniMiesiac) > 0
    //);

    const ostatnieWypozyczenia = (arr: Wypozyczenie[]) => {
      const arrcpy: Wypozyczenie[] = [];
      for (let x = 0; x < arr.length; x++) {
        //arr[x].data_wypozyczenia = new Date(arr[x].data_wypozyczenia); //make sure
        if (getDays(arr[x].data_wypozyczenia, ostatniMiesiac) > 0) {
          arrcpy.push(arr[x]);
        }
      }
      return arrcpy;
    };

    const ostatnieRezerwacje = (arr: Rezerwacja[]) => {
      const arrcpy: Rezerwacja[] = [];
      for (let x = 0; x < arr.length; x++) {
        //arr[x].data_wypozyczenia = new Date(arr[x].data_wypozyczenia); //make sure
        if (getDays(arr[x].data_wypozyczenia, ostatniMiesiac) > 0) {
          arrcpy.push(arr[x]);
        }
      }
      return arrcpy;
    };

    a_wszystkie_wypozyczenia = ostatnieWypozyczenia(a_wszystkie_wypozyczenia);
    a_wszystkie_rezerwacje = ostatnieRezerwacje(a_wszystkie_rezerwacje);

    //przychod
    const przychod = (arr: Wypozyczenie[]) => {
      let sum = 0;
      for (let x in arr) {
        sum += arr[x].cena_wypozyczenia;
      }
      return sum;
    };
    const id_wypozyczen = (arr) => {
      for (let x in arr) {
        arr[x] = arr[x].nr_wyp;
      }
      return arr;
    };
    const id_rezerwacji = (arr) => {
      for (let x in arr) {
        arr[x] = arr[x].nr_rez;
      }
      return arr;
    };
    //return przychod(a_wszystkie_wypozyczenia);
    const kasa = przychod(a_wszystkie_wypozyczenia);

    const nowyRaport = this.raportRepository.create({
      il_wypozyczen: a_wszystkie_wypozyczenia.length,
      kto_sporzadzil: kto.id,
      wszystkie_wypozyczenia: id_wypozyczen(
        a_wszystkie_wypozyczenia,
      ).toString(),
      wszystkie_rezerwacje: id_rezerwacji(a_wszystkie_rezerwacje).toString(),
      data_stworzenia: teraz,
      przychod: kasa,
    });

    await this.raportRepository.save(nowyRaport);
    return nowyRaport;
  }

  async wypiszOstatniRaport() {
    //if(await this.raportRepository.find())
    const raportyId = await this.raportRepository.find({
      select: { id: true },
    });
    if (raportyId.length == 0)
      throw new HttpException(
        'Nie istnieją żadne raporty',
        HttpStatus.NOT_FOUND,
      );

    const max = (arr: Raport[]) => {
      let arrcpy: number[] = [];
      for (let x in arr) {
        arrcpy.push(arr[x].id);
      }
      return Math.max(...arrcpy);
    };

    const raport = await this.raportRepository.findOne({
      where: { id: max(raportyId) },
    });

    return raport;
  }

  async wypiszRaporty() {
    const ostatnieRaporty = await this.raportRepository.find();
    if (ostatnieRaporty) return ostatnieRaporty;
    throw new HttpException('Nie istnieją żadne raporty', HttpStatus.NOT_FOUND);
  }
}
