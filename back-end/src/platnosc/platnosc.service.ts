import { Injectable } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { platform } from 'os';
import Klient from 'src/klient/klient.entity';
import Rezerwacja from 'src/rezerwacja/rezerwacja.entity';
import Wypozyczenie from 'src/wypozyczenie/wypozyczenie.entity';
import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';
import Platnosc from './platnosc.entity';

@Injectable()
export default class PlatnoscService {
  constructor(
    @InjectRepository(Platnosc)
    private platnoscRepository: Repository<Platnosc>, //nieuzywane
    @InjectRepository(Wypozyczenie)
    private wypozyczenieRepository: Repository<Wypozyczenie>,
    @InjectRepository(Rezerwacja)
    private rezerwacjaRepository: Repository<Rezerwacja>,
  ) {}

  async platnoscReszty(kwota: number, nr_wyp: number) {
    //platnosc bedzie wtedy, gdy placimy reszte kwoty ustalonej
    //w wypozyczeniu, tzn 0.75 calej kwoty.
    const wypozyczenie = await this.wypozyczenieRepository.findOne({
      where: { nr_wyp },
    });
    if (wypozyczenie) return 0.75 * kwota;
    throw new HttpException(
      'Nie ma takiego wypozyczenia',
      HttpStatus.NOT_FOUND,
    );
  }

  async platnosc(kwota: number, nr_wyp: number) {
    //platnosc bedzie wtedy, gdy placimy reszte kwoty ustalonej
    //w wypozyczeniu, tzn 0.75 calej kwoty.
    const wypozyczenie = await this.wypozyczenieRepository.findOne({
      where: { nr_wyp },
    });
    if (wypozyczenie) return kwota;
    throw new HttpException(
      'Nie ma takiego wypozyczenia',
      HttpStatus.NOT_FOUND,
    );
  }

  async zaplacZaliczke(klient: Klient, nr_rez: number) {
    //przy rezerwacji
    const platnosc = this.platnoscRepository.create({
      kwota: 50,
      id_klienta: klient.id,
    });
    this.platnoscRepository.save(platnosc);

    if (platnosc) return true;
    throw new HttpException('Nie ma takiej rezerwacji', HttpStatus.NOT_FOUND);
  }
}
