import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { KlientModule } from 'src/klient/klient.module';
import { WeryfikacjaService } from './weryfikacja.service';
import { WeryfikacjaController } from './weryfikacja.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PracownicyModule } from 'src/pracownicy/pracownicy.module';
import { LocalPracownikStrategy } from './strategy/localPracownik.strategy';
import { JwtStrategyPracownik } from './strategy/jwtPracownik.strategy';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    KlientModule,
    PracownicyModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [WeryfikacjaService, LocalStrategy, JwtStrategy, LocalPracownikStrategy, JwtStrategyPracownik],
  controllers: [WeryfikacjaController]
})
export class WeryfikacjaModule {}