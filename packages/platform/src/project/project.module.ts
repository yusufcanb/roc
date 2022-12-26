import { Module } from '@nestjs/common';

import { RedisModule } from '../redis/redis.module';

import {
  ProjectController,
  ProjectDetailController,
} from './project.controller';
import { ProjectExistsPipe } from './project.pipe';
import { ProjectRedisRepository } from './project.repository';

@Module({
  imports: [RedisModule],
  controllers: [ProjectController, ProjectDetailController],
  providers: [
    ProjectExistsPipe,
    {
      provide: 'ProjectRepository',
      useClass: ProjectRedisRepository,
    },
  ],
  exports: [ProjectExistsPipe],
})
export class ProjectModule {}
