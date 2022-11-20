import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EnvironmentModule } from './environment';
import { ProjectModule } from './project';

import { RedisModule } from './redis';

@Module({
  imports: [RedisModule, ProjectModule, EnvironmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
