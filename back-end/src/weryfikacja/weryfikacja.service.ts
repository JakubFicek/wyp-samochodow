import KlientService from "src/klient/klient.service";
import RegisterDto from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import PostgresErrorCode from "src/bazadanych/postgresErrorCode.enum";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "src/typy/tokenPayload.interface";

@Injectable()
export class WeryfikacjaService {
  constructor(
    private readonly klientService: KlientService,
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
    
    public async getConfirmedUser(email: string, hashedPass: string) {
      try {
          const klient = await this.klientService.findUserByEmail(email);
          await this.verifyPassword(klient.haslo, hashedPass);
          return klient;
      } catch (error) {
          throw new HttpException("WRONG CREDENTIALS PROVIDED. ", HttpStatus.BAD_REQUEST);
      }
  }
    
    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        plainTextPassword
      );
      if (!isPasswordMatching) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
    }

    public getCookieWithJwtToken(klientId: number) {
      const payload: TokenPayload = {klientId};
      const token = this.jwtService.sign(payload);
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}