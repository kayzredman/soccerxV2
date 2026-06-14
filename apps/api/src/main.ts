import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import { AppModule } from './modules/app.module.js';
import { getEnv } from '@soccerx/config';

async function bootstrap() {
  const env = getEnv();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  await app.register(cookie);
  await app.register(cors, {
    origin: [env.APP_ORIGIN],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(env.APP_PORT, '0.0.0.0');
}

bootstrap();
