import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BazaDanychModule } from './bazadanych/bazadanych.module';
import { SamochodModule } from './samochod/samochod.module';

@Module({
  imports: [
    SamochodModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      })
    }),
    BazaDanychModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
