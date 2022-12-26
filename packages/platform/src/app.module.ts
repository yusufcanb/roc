import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EnvironmentModule } from './environment';
import { ProjectModule } from './project';

import { RedisModule } from './redis';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),
    RedisModule,
    ProjectModule,
    EnvironmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
