import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Raport {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public il_wypozyczen: number;

  @Column()
  public kto_sporzadzil: number;

  @Column()
  public wszystkie_wypozyczenia: string; //z danego miesiaca

  @Column()
  public wszystkie_rezerwacje: string;

  @Column()
  public data_stworzenia: Date;

  @Column()
  public przychod: number;
}

export default Raport;
