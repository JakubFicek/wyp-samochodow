export default class EdytujPracownikaDto {
    id?: number;
    imie?: string;
    nazwisko?: string;
    email: string;
    typ_umowy?: string;
    data_zatrudnienia: Date;
    wynagrodzenie?: number;
    stan?: string;
}