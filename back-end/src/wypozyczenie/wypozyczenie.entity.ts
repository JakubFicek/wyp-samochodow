import Klient from 'src/klient/klient.entity';
import Samochod from 'src/samochod/samochod.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Wypozyczenie {
  @PrimaryGeneratedColumn()
  public nr_wyp: number;

  @Column()
  public samochod: Samochod;

  @Column()
  public data_wypozyczenia: Date;

  @Column()
  public przez_kogo: Klient;

  /* cos mi tu nie wychodzi xd zmienilem nr_wyp na public, bo w service mialem błędy
  public sprawdzID(id: number) {
    //lepiej chyba wyszukiwac wypozyczenie przez numer a nie samochod
    if (id == this.nr_wyp) {
      return this.nr_wyp;
    } else return -1;
  }
  */
}

export default Wypozyczenie;
