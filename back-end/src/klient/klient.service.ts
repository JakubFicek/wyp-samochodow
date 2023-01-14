import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
import Samochod from 'src/samochod/samochod.entity';
import Wypozyczenie from 'src/wypozyczenie/wypozyczenie.entity';
import { Column, Repository } from 'typeorm';
import { edytujKlientDto } from './dto/edytujKlient.dto';
import { KlientDto } from './dto/klient.dto';
import Klient from './klient.entity';
import WypozyczenieService from 'src/wypozyczenie/wypozyczenie.service';

@Injectable()
export default class KlientService {
  constructor(
    @InjectRepository(Klient)
    private klientRepository: Repository<Klient>,
    @InjectRepository(Wypozyczenie)
    private wypozyczenieRepository: Repository<Wypozyczenie>,
  ) {}

  wybierzDate() {
    //zwiazane bedzie z rezerwacja/wypozyczeniem
  }

  podajDane() {
    //zwiazanne bedzie z rezerwacja/wypozyczeniem
  }

  wybierzSamochod() {
    //zwiazane bedzie z rezerwacja/wypozyczeniem
  }

  oddanie(samochod: Samochod) {
    //zaimplementowac najpierw platnosci
  }

  async weryfikacja_danych(id: number) {
    const klient = await this.klientRepository.findOne({ where: { id } });
    return klient.weryfikacjaDanych();
  }

  async historiaKlienta(id_klienta: number) {
    const wypozyczenie = await this.wypozyczenieRepository.find({
      where: { id_klienta },
    });
  }
}
