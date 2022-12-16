import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const express = require('express');
const path = require('path');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.use('/', express.static(path.join(__dirname, 'public')));

  await app.listen(3000);
}

bootstrap();
