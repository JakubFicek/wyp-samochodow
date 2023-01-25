import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Platnosc {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public kwota?: number;

  @Column()
  public id_klienta?: number;
}

export default Platnosc;
