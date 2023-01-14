import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import Rola from "../enum/role.enum";

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
  private typ_umowy: string;
    
  @Column()
  private data_zatrudnienia: string;
    
  @Column()
  private wynagrodzenie: number;

  @Column()
  public rola: string;
}