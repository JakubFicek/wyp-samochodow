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
        throw new HttpException("Administrator juz istnieje!!", HttpStatus.CONFLICT)
      }
    }
  }

  async edytuj_pracownika(email: string, noweDane: EdytujPracownikaDto){
    const edytowanyPracownik = await this.sprzedawcaRepository.findOne({
      where: { email },
    });
    await this.sprzedawcaRepository.update(edytowanyPracownik.id, noweDane);
    if (edytowanyPracownik) {
      return await this.sprzedawcaRepository.findOne({
        where: { email },
      });
    } else {
      const edytowanyPracownik = await this.serwisantRepository.findOne({
        where: { email },
      });
      await this.serwisantRepository.update(edytowanyPracownik.id, noweDane);
      if (edytowanyPracownik) {
        return await this.serwisantRepository.findOne({
          where: { email },
        });
      } else {
        const edytowanyPracownik = await this.administratorRepository.findOne({
          where: { email },
        });
        await this.administratorRepository.update(edytowanyPracownik.id, noweDane);
        if (edytowanyPracownik) {
          return await this.administratorRepository.findOne({
            where: { email },
          });
        } else {
          throw new HttpException('Nie znaleziono pracownika', HttpStatus.NOT_FOUND);
        }
      }
    }
  }

  async usun_pracownika(email: string){
    const deleteResponse = await this.sprzedawcaRepository.delete(email);
    if (!deleteResponse.affected) {
      const deleteResponse = await this.serwisantRepository.delete(email);
      if (!deleteResponse.affected) {
        throw new HttpException('Nie znaleziono pracownika o tym id', HttpStatus.NOT_FOUND);
      }
    }
  }
}