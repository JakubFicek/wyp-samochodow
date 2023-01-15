import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
import Klient from 'src/klient/klient.entity';
import { Repository } from 'typeorm';
import { RezerwacjaDto } from './dto/rezerwacja.dto';
import Rezerwacja from './rezerwacja.entity';

@Injectable()
export default class RezerwacjaService {
  constructor(
    @InjectRepository(Rezerwacja)
    public rezerwacjaRepository: Repository<Rezerwacja>,
  ) {}

  //dodać do diagramu stworzRezerwacje i usunRezerwacje
  async stworzRezerwacje(rezerwacja: RezerwacjaDto) {
    const nowaRezerwacja = await this.rezerwacjaRepository.create(rezerwacja);
    await this.rezerwacjaRepository.save(nowaRezerwacja);
    return nowaRezerwacja;
  }

  async usunRezerwacje(nr_rez: number) {
    const deleteResponse = await this.rezerwacjaRepository.delete(nr_rez);
    if (!deleteResponse.affected) {
      throw new HttpException(
        'Nie znaleziono wypożyczenia',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async znajdzRezerwacje(nr_rez: number) {
    const rez = await this.rezerwacjaRepository.findOne({ where: { nr_rez } });
    if (rez) {
      return rez;
    }
    throw new HttpException('Nie znaleziono rezerwacji', HttpStatus.NOT_FOUND);
  }
}
