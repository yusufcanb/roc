import { Module } from '@nestjs/common';
import { DockerRobotExecutor } from '@roc/executor';

import { RedisModule } from '../redis';
import { ProjectModule } from '../project';
import { EnvironmentModule } from '../environment';
import { TaskForceModule } from '../task-force';

import { JobController } from './job.controller';
import { JobRedisRepository } from './job.repository';
import { JobService } from './job.service';

@Module({
  imports: [RedisModule, ProjectModule, TaskForceModule, EnvironmentModule],
  controllers: [JobController],
  providers: [
    {
      provide: 'RobotExecutor',
      useClass: DockerRobotExecutor,
    },
    JobRedisRepository,
    JobService,
  ],
})
export class JobModule {}
