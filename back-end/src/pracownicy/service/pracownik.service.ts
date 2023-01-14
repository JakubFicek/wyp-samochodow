import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import EdytujPracownikaDto from "../dto/edytujPracownika.dto";
import NowyPracownikDto from "../dto/nowyPracownik.dto";
import { Administrator } from "../entity/administrator.entity";
import { Serwisant } from "../entity/serwisant.entity";
import { Sprzedawca } from "../entity/sprzedawca.entity";
import Rola from "../enum/role.enum";

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

  async dodaj_pracownika(daneNowegoPracownika: NowyPracownikDto) {
    if(daneNowegoPracownika.rola === Rola.Sprzedawca) {
      const nowySprzedawca = await this.sprzedawcaRepository.create(daneNowegoPracownika);
      await this.sprzedawcaRepository.save(nowySprzedawca);
      return nowySprzedawca;
    } 
    else if(daneNowegoPracownika.rola === Rola.Serwisant) {
      const nowySerwisant = await this.serwisantRepository.create({...daneNowegoPracownika, stan: "Dostepny"});
      await this.sprzedawcaRepository.save(nowySerwisant);
      return nowySerwisant;
    } 
    else if(daneNowegoPracownika.rola === Rola.Administrator){
      if(!this.administratorRepository.find()){
        const nowyAdministratorDoBD = await this.administratorRepository.create({...daneNowegoPracownika, klucz_weryfikacyjny: "sf23451AJASfasfnasjfasfaA"}) 
        await this.administratorRepository.save(nowyAdministratorDoBD);
        return nowyAdministratorDoBD;
      } else {
        throw new Error("Administrator juz istnieje!!")
      }
    }
  }

  async edytuj_pracownika(id: number, noweDane: EdytujPracownikaDto){
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
          throw new HttpException('Nie znaleziono pracownika', HttpStatus.NOT_FOUND);
        }
      }
    }
  }

  async usun_pracownika(id: number){
    const deleteResponse = await this.sprzedawcaRepository.delete(id);
    if (!deleteResponse.affected) {
      const deleteResponse = await this.serwisantRepository.delete(id);
      if (!deleteResponse.affected) {
        throw new HttpException('Nie znaleziono pracownika o tym id', HttpStatus.NOT_FOUND);
      }
    }
  }
}