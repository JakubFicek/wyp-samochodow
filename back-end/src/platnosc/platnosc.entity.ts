import { platform } from 'os';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Platnosc {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public kwota?: number;
}

export default Platnosc;
