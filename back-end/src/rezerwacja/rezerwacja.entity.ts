import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Rezerwacja {
  @PrimaryGeneratedColumn()
  public nr_rez: number;

  @Column()
  public id_samochodu: number;

  @Column()
  public data_wypozyczenia: Date;

  @Column()
  public data_zwrotu: Date;

  @Column()
  public id_klienta: number;
}

export default Rezerwacja;
