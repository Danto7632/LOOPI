import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from '../src/app.module';

const server = express();

async function createApp(): Promise<express.Express> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  
  // CORS 설정
  app.enableCors({
    origin: [
      'https://danto7632.github.io',
      'http://localhost:3000',
    ],
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  await app.init();
  return server;
}

export default createApp();