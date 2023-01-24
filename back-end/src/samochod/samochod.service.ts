import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { wpis } from 'src/typy/wpis.interface';
import { Repository } from 'typeorm';
import { edytujSamochodDto } from './dto/edytujSamochod.dto';
import { SamochodDto } from './dto/samochod.dto';
import Samochod from './samochod.entity';
import { daty } from 'src/typy/wpis.interface';

@Injectable()
export default class SamochodService {
  constructor(
    @InjectRepository(Samochod)
    private samochodRepository: Repository<Samochod>,
  ) {}

  //funkcja wypisująca wszystkie samochody w wypożyczalni
  wypiszSamochody() {
    return this.samochodRepository.find();
  }

  //funkcja wypisująca dostępne samochody
  wypiszDostepneSamochody() {
    return this.samochodRepository.find({
      where: [{ stan_pojazdu: 'Dostepny' }],
    });
  }

  //funkcja wypisująca dostępne samochody po podaniu dwóch dat w formacie "RRRR-MM-DDTHH:MM:SSZ" gdzie "T" oznacza Time a "Z" strefę czasową UTC
  async wypiszDostepneSamochodyWTerminie(daty: daty) {
    const samochody = await this.samochodRepository.find({
      where: [{ stan_pojazdu: 'Dostepny' }],
    });
    const dostepne = (arr: Samochod[]) => {
      const arrcpy: Samochod[] = [];
      let index: boolean = false;
      for (let x in arr) {
        if (arr[x].zajete_terminy[0] && arr[x].zajete_terminy[1]) {
          for (let i in arr[x].zajete_terminy) {
            let dateW = arr[x].zajete_terminy[i][0].getTime();
            let dateO = arr[x].zajete_terminy[i][1].getTime();
            if (
              (new Date(daty.data_wypozyczenia).getTime() < dateW &&
                new Date(daty.data_zwrotu).getTime() < dateW) ||
              (new Date(daty.data_wypozyczenia).getTime() > dateO &&
                new Date(daty.data_zwrotu).getTime() > dateO)
            ) {
              index = true;
            } else {
              index = false;
              break;
            }
          }
          if (index) {
            //w petli jest termin zajety
            arrcpy.push(arr[x]);
            index = false;
            console.log(false);
          }
        } else {
          //nie ma zajetych terminow
          arrcpy.push(arr[x]);
        }
      }
      return arrcpy;
    };
    return dostepne(samochody);
  }

  async dodaj_samochod(samochod: SamochodDto) {
    const nowySamochod = await this.samochodRepository.create(samochod);
    await this.samochodRepository.save(nowySamochod);
    return nowySamochod;
  }

  async usun_samochod(id: number) {
    const deleteResponse = await this.samochodRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Nie znaleziono samochodu', HttpStatus.NOT_FOUND);
    }
  }

  //funkcja zwracająca stan pojazdu. zwraca: 'Dostepny','Do naprawy','Do przegladu'.
  async zwrocStan(id: number) {
    const samochod = await this.samochodRepository.findOne({ where: { id } });
    return samochod.stan_pojazdu;
  }

  async zwrocJeden(id: number) {
    const samochod = await this.samochodRepository.findOne({ where: { id } });
    return samochod;
  }

  //funkcja następująca po oddaniu samochodu, wywołuje sprzedawca, zmienia stan na 'Do przegladu'
  async zwrotDoPrzegladu(id: number) {
    const samochod = await this.samochodRepository.findOne({
      where: { id },
    });
    if (!samochod) {
      throw new HttpException('Nie znaleziono samochodu', HttpStatus.NOT_FOUND);
    }
    let stan: string;
    if (!samochod.stan_pojazdu) {
      throw new HttpException(
        'Samochód nie posiada stanu',
        HttpStatus.AMBIGUOUS,
      );
    } else {
      stan = samochod.stan_pojazdu;
    }
    if (stan === 'Dostepny') {
      samochod.stan_pojazdu = 'Do przegladu';
      await this.samochodRepository.update(id, samochod);
    } else
      throw new HttpException(
        'Samochod nie jest dostepny',
        HttpStatus.CONTINUE,
      );
    return samochod;
  }

  //zmiana stanu samochodu tzn. dowolnych jego parametrów
  async zmienStan(id: number, samochod: edytujSamochodDto) {
    await this.samochodRepository.update(id, samochod);
    const nowySamochod = await this.samochodRepository.findOne({
      where: { id },
    });
    if (nowySamochod) {
      return nowySamochod;
    }
    throw new HttpException('Nie znaleziono samochodu', HttpStatus.NOT_FOUND);
  }

  //funckja która zwraca stan samochodu 'Dostępny' po tym jak był 'Do naprawy'
  async serwis(id: number) {
    const samochod = await this.samochodRepository.findOne({ where: { id } });
    if (!samochod)
      throw new HttpException('Nie znaleziono samochodu', HttpStatus.NOT_FOUND);
    let stan: string;
    if (!samochod.stan_pojazdu) {
      throw new HttpException(
        'Samochód nie posiada stanu',
        HttpStatus.AMBIGUOUS,
      );
    } else {
      stan = samochod.stan_pojazdu;
    }
    if (stan === 'Do naprawy' || stan === 'Do przegladu') {
      samochod.stan_pojazdu = 'Dostepny';
      await this.samochodRepository.update(id, samochod);
    } else
      throw new HttpException(
        'Samochod nie wymaga naprawy',
        HttpStatus.CONTINUE,
      );
    return samochod;
  }

  async zepsuty(id: number) {
    const samochod = await this.samochodRepository.findOne({ where: { id } });
    if (!samochod)
      throw new HttpException('Nie znaleziono samochodu', HttpStatus.NOT_FOUND);
    let stan: string;
    if (!samochod.stan_pojazdu) {
      throw new HttpException(
        'Samochód nie posiada stanu',
        HttpStatus.AMBIGUOUS,
      );
    } else {
      stan = samochod.stan_pojazdu;
    }
    if (stan === 'Do przegladu') {
      samochod.stan_pojazdu = 'Do naprawy';
      await this.samochodRepository.update(id, samochod);
    } else
      throw new HttpException(
        'Samochod nie jest przeznaczony do naprawy',
        HttpStatus.CONTINUE,
      );
    return samochod;
  }

  //funckja która edytuje książkę serwisową.
  async edytujKsiazkeSerwisowa(id: number, nowyWpis: wpis) {
    const sam = await this.samochodRepository.findOne({ where: { id } });
    sam.dodajWpis(nowyWpis.wpis);
    await this.samochodRepository.update(id, sam);
    const zaaktualizowanyWpis = await this.samochodRepository.findOne({
      where: { id },
    });
    if (zaaktualizowanyWpis) {
      return zaaktualizowanyWpis;
    }
    throw new HttpException('Nie znaleziono samochodu', HttpStatus.NOT_FOUND);
  }
}
