import { InjectRepository } from '@nestjs/typeorm';
import Klient from 'src/klient/klient.entity';
import Samochod from 'src/samochod/samochod.entity';
import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';

@Entity()
class Wypozyczenie {
  @PrimaryGeneratedColumn()
  public nr_wyp: number; //zmiana z private na public

  @Column() //zamiast typu samochod bedzie id samochodu
  public id_samochodu: number;

  @Column()
  public data_wypozyczenia: Date;

  @Column()
  public data_zwrotu: Date;

  @Column() //zamiast typu klient bedzie id klienta
  public id_klienta: number;
}

export default Wypozyczenie;
