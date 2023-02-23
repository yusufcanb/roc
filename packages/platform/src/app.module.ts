import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { RedisModule } from './redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EnvironmentModule } from './environment';
import { ProjectModule } from './project';
import { TaskForceModule } from './task-force';
import { JobModule } from './job';
import { AppLoggerMiddleware } from './logger.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),
    RedisModule,
    ProjectModule,
    EnvironmentModule,
    TaskForceModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
