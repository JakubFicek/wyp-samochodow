import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import EdytujPracownikaDto from '../dto/edytujPracownika.dto';
import NowyPracownikDto from '../dto/nowyPracownik.dto';
import { Administrator } from '../entity/administrator.entity';
import { Serwisant } from '../entity/serwisant.entity';
import { Sprzedawca } from '../entity/sprzedawca.entity';
import Rola from '../enum/role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class PracownikService {
  constructor(
    @InjectRepository(Sprzedawca)
    private sprzedawcaRepository: Repository<Sprzedawca>,
    @InjectRepository(Administrator)
    private administratorRepository: Repository<Administrator>,
    @InjectRepository(Serwisant)
    private serwisantRepository: Repository<Serwisant>,
  ) {}

  async zwrocSprzedawcow() {
    return this.sprzedawcaRepository.find();
  }

  async zwrocSerwisantow() {
    return this.serwisantRepository.find();
  }

  async dodaj_pracownika(daneNowegoPracownika: NowyPracownikDto) {
    const hashedHaslo = await bcrypt.hash(daneNowegoPracownika.haslo, 10);
    if (daneNowegoPracownika.rola === Rola.Sprzedawca) {
      const nowySprzedawca = await this.sprzedawcaRepository.create({
        ...daneNowegoPracownika,
        haslo: hashedHaslo,
      });
      await this.sprzedawcaRepository.save(nowySprzedawca);
      return nowySprzedawca;
    } else if (daneNowegoPracownika.rola === Rola.Serwisant) {
      const nowySerwisant = await this.serwisantRepository.create({
        ...daneNowegoPracownika,
        haslo: hashedHaslo,
        stan: 'Dostepny',
      });
      await this.serwisantRepository.save(nowySerwisant);
      return nowySerwisant;
    } else if (daneNowegoPracownika.rola === Rola.Administrator) {
      if ((await this.administratorRepository.find()).length == 0) {
        const nowyAdministratorDoBD = await this.administratorRepository.create(
          {
            ...daneNowegoPracownika,
            haslo: hashedHaslo,
            klucz_weryfikacyjny: 'sf23451AJASfasfnasjfasfaA',
          },
        );
        await this.administratorRepository.save(nowyAdministratorDoBD);
        return nowyAdministratorDoBD;
      } else {
        throw new HttpException(
          'Administrator juz istnieje!!',
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  async edytuj_pracownika(id: number, noweDane: EdytujPracownikaDto) {
    await this.sprzedawcaRepository.update(id, noweDane);
    const edytowanyPracownik = await this.sprzedawcaRepository.findOne({
      where: { id },
    });
    if (edytowanyPracownik) {
      return edytowanyPracownik;
    } else {
      await this.serwisantRepository.update(id, noweDane);
      const edytowanyPracownik = await this.serwisantRepository.findOne({
        where: { id },
      });
      if (edytowanyPracownik) {
        return edytowanyPracownik;
      } else {
        await this.administratorRepository.update(id, noweDane);
        const edytowanyPracownik = await this.administratorRepository.findOne({
          where: { id },
        });
        if (edytowanyPracownik) {
          return edytowanyPracownik;
        } else {
          throw new HttpException(
            'Nie znaleziono pracownika',
            HttpStatus.NOT_FOUND,
          );
        }
      }
    }
  }

  async usun_pracownika(id: number) {
    const prac = await this.sprzedawcaRepository.findOne({ where: { id } });
    if (prac) {
      const deleteResponse = await this.sprzedawcaRepository.delete(
        prac.id_w_konkretnej_bd,
      );
      if (!deleteResponse.affected) {
        throw new HttpException(
          'Nie znaleziono pracownika o tym id',
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      const prac = await this.serwisantRepository.findOne({ where: { id } });
      if (prac) {
        const deleteResponse = await this.serwisantRepository.delete(
          prac.id_w_konkretnej_bd,
        );
        if (!deleteResponse.affected) {
          throw new HttpException(
            'Nie znaleziono pracownika o tym id',
            HttpStatus.NOT_FOUND,
          );
        }
      }
    }
  }

  async znajdzPoEmailu(email: string) {
    const szukany = await this.sprzedawcaRepository.findOne({
      where: { email },
    });
    if (szukany) {
      return szukany;
    } else {
      const szukany = await this.serwisantRepository.findOne({
        where: { email },
      });
      if (szukany) {
        return szukany;
      } else {
        const szukany = await this.administratorRepository.findOne({
          where: { email },
        });
        if (szukany) {
          return szukany;
        } else {
          throw new HttpException(
            'Nie znaleziono pracownika o tym emailu',
            HttpStatus.NOT_FOUND,
          );
        }
      }
    }
  }

  async znajdzPoId(id: number) {
    const szukany = await this.sprzedawcaRepository.findOne({ where: { id } });
    if (szukany) {
      return szukany;
    } else {
      const szukany = await this.serwisantRepository.findOne({ where: { id } });
      if (szukany) {
        return szukany;
      } else {
        const szukany = await this.administratorRepository.findOne({
          where: { id },
        });
        if (szukany) {
        } else {
          throw new HttpException(
            'Nie znaleziono pracownika o tym id',
            HttpStatus.NOT_FOUND,
          );
        }
      }
    }
  }
}
