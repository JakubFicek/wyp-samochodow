import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import Klient from "src/klient/klient.entity";
import { WeryfikacjaService } from "../weryfikacja.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private weryfikacjaService: WeryfikacjaService){
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, passw: string): Promise<Klient> {
        return this.weryfikacjaService.getConfirmedUser(email, passw);
    }
}