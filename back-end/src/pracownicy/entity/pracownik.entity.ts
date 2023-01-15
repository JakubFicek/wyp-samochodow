import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pracownik {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public imie: string;

  @Column()
  public nazwisko: string;

  @Column({unique: true})
  public email: string;

  @Column()
  @Exclude()
  public haslo: string;

  @Column()
  private typ_umowy: string;
    
  @Column()
  @Exclude()
  private data_zatrudnienia: string;
    
  @Column()
  @Exclude()
  private wynagrodzenie: number;

  @Column()
  public rola: string;
}