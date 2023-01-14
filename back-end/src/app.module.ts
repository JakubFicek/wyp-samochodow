import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BazaDanychModule } from './bazadanych/bazadanych.module';
import { KlientModule } from './klient/klient.module';
import { PracownicyModule } from './pracownicy/pracownicy.module';
import { SamochodModule } from './samochod/samochod.module';
import { WeryfikacjaModule } from './weryfikacja/weryfikacja.module';

@Module({
  imports: [
    KlientModule,
    SamochodModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    BazaDanychModule,
    WeryfikacjaModule,
    PracownicyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
