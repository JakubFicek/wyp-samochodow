import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pracownik {
  @PrimaryGeneratedColumn()
  public id_w_konkretnej_bd?: number;
  
  @Column({unique: true})
  public id: number;

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
  private data_zatrudnienia: string;
    
  @Column()
  private wynagrodzenie: number;

  @Column()
  public rola: string;
}

export default Pracownik;