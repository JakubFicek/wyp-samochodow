import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector))
  );
  app.useGlobalPipes(new ValidationPipe({forbidUnknownValues: false}));
  app.use(cookieParser());
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
