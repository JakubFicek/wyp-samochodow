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

  async create(daneKlienta: KlientDto) {
    const nowyKlient = await this.klientRepository.create(daneKlienta);
    await this.klientRepository.save(nowyKlient);
    return nowyKlient;
  }

  async findUserByEmail(email: string) {
    const user = await this.klientRepository.findOne({ where: { email } })
    if(user) return user;
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async weryfikacja_danych(id: number) {
    const klient = await this.klientRepository.findOne({ where: { id } });
    return klient.weryfikacjaDanych();
  }
  
  async historiaKlienta(id_klienta: number) {
    const wypozyczenia = await this.wypozyczenieRepository.find({
      where: { id_klienta },
    });
    return wypozyczenia;
  }
  
  async getById(id: number) {
    const klient = await this.klientRepository.findOne({where: {id}});
    if (klient) {
      return klient;
    }
    throw new HttpException('Klient o tym id nie istnieje', HttpStatus.NOT_FOUND);
  }
}
