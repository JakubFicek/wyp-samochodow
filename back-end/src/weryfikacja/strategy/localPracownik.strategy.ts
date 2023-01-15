import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Pracownik } from "src/pracownicy/entity/pracownik.entity";
import { WeryfikacjaService } from "../weryfikacja.service";


@Injectable()
export class LocalPracownikStrategy extends PassportStrategy(Strategy, 'localPracownik'){
    constructor(private weryfikacjaService: WeryfikacjaService){
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, passw: string): Promise<Pracownik> {
        return this.weryfikacjaService.potwierdzPracownika(email, passw);
    }
}