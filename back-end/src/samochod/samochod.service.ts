import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
import { wpis } from 'src/typy/wpis.interface';
import { Repository } from 'typeorm';
import { edytujSamochodDto } from './dto/edytujSamochod.dto';
import { SamochodDto } from './dto/samochod.dto';
import Samochod from './samochod.entity';

@Injectable()
export default class SamochodService {
  constructor(
    @InjectRepository(Samochod)
    private samochodRepository: Repository<Samochod>,
  ) {}

  wypiszSamochody() {
    return this.samochodRepository.find();
  }

  wypiszDostepneSamochody() {
    return this.samochodRepository.find({
      where: [{ stan_pojazdu: 'Dostepny' }],
    });
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

  serwis() {
    /* nie wiem co tutaj xd */
  }

  async zwrocStan(id: number) {
    const samochod = await this.samochodRepository.findOne({ where: { id } });
    return samochod.stan_pojazdu;
  }

  async zwrotDoPrzegladu(id: number, samochod: edytujSamochodDto) {
    await this.samochodRepository.update(id, samochod);
    const updatedPost = await this.samochodRepository.findOne({
      where: { id },
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Nie znaleziono samochodu', HttpStatus.NOT_FOUND);
  }

  async zmienStan(id: number, samochod: edytujSamochodDto) {
    await this.samochodRepository.update(id, samochod);
    const updatedPost = await this.samochodRepository.findOne({
      where: { id },
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Nie znaleziono samochodu', HttpStatus.NOT_FOUND);
  }

  async edytujKsiazkeSerwisowa(id: number, nowyWpis: wpis) {
    const sam = await this.samochodRepository.findOne({ where: { id } });
    sam.dodajWpis(nowyWpis.wpis);
    await this.samochodRepository.update(id, sam);
    const updatedPost = await this.samochodRepository.findOne({
      where: { id },
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Nie znaleziono samochodu', HttpStatus.NOT_FOUND);
  }
}
