import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    rawBody: true,
    cors: { credentials: true, origin: 'http://localhost:3001' },
  });
  await app.enableShutdownHooks();
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.setGlobalPrefix('api', { exclude: ['/'] });
  const prisma = new PrismaClient();
  const configService = app.get(ConfigService);
  app.use(
    session({
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
      secret: configService.get('session'),
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(configService.get('port'));
}

bootstrap();
