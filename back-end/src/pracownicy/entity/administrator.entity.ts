import { Column, Entity } from "typeorm";
import { Pracownik } from "./pracownik.entity";

@Entity()
export class Administrator extends Pracownik{
  static instance: Administrator;
  
  private constructor() {
    super();
  }

  public static getInstance(): Administrator {
    if (!Administrator.instance) {
        Administrator.instance = new Administrator();
    }
    return Administrator.instance;
  }
  
  @Column()
  public klucz_weryfikacyjny: string;
}