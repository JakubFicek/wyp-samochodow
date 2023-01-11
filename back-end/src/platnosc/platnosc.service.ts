import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Platnosc {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  private kwota?: number;

  public platnosc(_kwota: number) {
    // dokończyć po ustaleniu systemu jaki obierzemy
  }
}
