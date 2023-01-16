import KlientService from "src/klient/klient.service";
import RegisterDto from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import PostgresErrorCode from "src/bazadanych/postgresErrorCode.enum";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "src/typy/tokenPayload.interface";
import { TokenPayloadPracownik } from "src/typy/tokenPayloadPracownik.interface";
import PracownikService from "src/pracownicy/service/pracownik.service";

@Injectable()
export class WeryfikacjaService {
  constructor(
    private readonly klientService: KlientService,
    private readonly pracownikService: PracownikService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
    ) {}
   
    public async register(daneZakladaniaKonta: RegisterDto) {
      const hashedHaslo = await bcrypt.hash(daneZakladaniaKonta.haslo, 10);
      try {
        const nowyKlient = await this.klientService.create({
          ...daneZakladaniaKonta,
          haslo: hashedHaslo
        });
        return nowyKlient;
      } catch (error) {
        if (error?.code === PostgresErrorCode.UniqueViolation) {
          throw new HttpException('Taki email jest juz uzywany', HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('Cos poszlo nie tak :(', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    public async potwierdzKlienta(email: string, hashedPass: string) {
      try {
          const klient = await this.klientService.znajdzPoEmailu(email);
          await this.zweryfikujHaslo(klient.haslo, hashedPass);
          return klient;
      } catch (error) {
          throw new HttpException("Zle dane. ", HttpStatus.BAD_REQUEST);
      }
    }

    public async potwierdzPracownika(email: string, hashedPass: string) {
      try {
          const pracownik = await this.pracownikService.znajdzPoEmailu(email);
          await this.zweryfikujHaslo(pracownik.haslo, hashedPass);
          return pracownik;
      } catch (error) {
          throw new HttpException("Zle dane. ", HttpStatus.BAD_REQUEST);
      }
    }
    
    private async zweryfikujHaslo(plainTextPassword: string, hashedPassword: string) {
      const czySieZgadza = await bcrypt.compare(
        hashedPassword,
        plainTextPassword
      );
      if (!czySieZgadza) {
        throw new HttpException('Zle dane wprowadzone', HttpStatus.BAD_REQUEST);
      }
    }

    public wezCookieZJwtToken(klientId: number) {
      const payload: TokenPayload = {klientId};
      const token = this.jwtService.sign(payload);
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    public wezCookieZJwtTokenDlaPracownika(pracownikId: number) {
      const payload: TokenPayloadPracownik = {pracownikId};
      const token = this.jwtService.sign(payload);
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    public wezCookiePoWylogowaniu() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}