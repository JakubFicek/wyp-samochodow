import { Injectable } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { platform } from 'os';
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

  async zaplacZaliczke(kwota: number, nr_rez: number) {
    //przy rezerwacji
    const rezerwacja = await this.rezerwacjaRepository.findOne({
      where: { nr_rez },
    });
    if (rezerwacja) return 0.25 * kwota;
    throw new HttpException('Nie ma takiej rezerwacji', HttpStatus.NOT_FOUND);
  }
}
