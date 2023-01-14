import { Column, Entity } from "typeorm";
import { Pracownik } from "./pracownik.entity"

@Entity()
export class Serwisant extends Pracownik {
  @Column()
  public stan: string;
}