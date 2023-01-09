import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Samochod {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public marka: string;

    @Column()
    public model: string;

    @Column()
    public rok_produkcji: number;

    @Column()
    public przebieg: number;

    @Column()
    public cena_za_dzien: number;

    @Column()
    public il_miejsc: number;

    @Column()
    public stan_pojazdu: string;

    @Column()
    private ksiazka_serwisowa: string;

    @Column()
    private czy_sprawdzony: boolean;

    public dodajWpis(nowyWpis: string) {
        this.ksiazka_serwisowa = this.ksiazka_serwisowa + ' \n ' + nowyWpis;
    }
}

export default Samochod;