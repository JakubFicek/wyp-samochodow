import { string } from '@hapi/joi';
import Wypozyczenie from 'src/wypozyczenie/wypozyczenie.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Klient {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public imie: string;

  @Column()
  public nazwisko: string;

  @Column()
  private pesel: string;

  @Column()
  public haslo: string;

  @Column()
  private czy_jest_prawo_jazdy: boolean;

  @Column()
  private wiek: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public historia: string;

  weryfikacjaDanych() {
    //zeby wypozyczyc musi miec 21 lat, prawo jazdy oraz podany pesel i poprawny mail
    const emailRegex = /\w+[@]\w+[.]\w+/g;
    if (
      this.wiek >= 21 &&
      this.czy_jest_prawo_jazdy == true &&
      this.pesel &&
      emailRegex.test(this.email)
    ) {
      return true;
    } else return false;
  }
}

export default Klient;
