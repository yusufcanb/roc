import { Module } from '@nestjs/common';

import { RedisModule } from '../redis/redis.module';

import {
  ProjectController,
  ProjectDetailController,
} from './project.controller';
import { ProjectRedisRepository } from './project.repository';

@Module({
  imports: [RedisModule],
  controllers: [ProjectController, ProjectDetailController],
  providers: [
    {
      provide: 'ProjectRepository',
      useClass: ProjectRedisRepository,
    },
  ],
})
export class ProjectModule {}
