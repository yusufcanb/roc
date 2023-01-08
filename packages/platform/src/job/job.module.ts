import { Module, Scope } from '@nestjs/common';
import { DockerRobotExecutor } from '@roc/executor';

import { RedisModule } from '../redis';
import { ProjectModule } from '../project';
import { EnvironmentModule } from '../environment';
import { TaskForceModule } from '../task-force';

import { JobController, JobDetailController } from './job.controller';
import { JobRedisRepository } from './job.repository';
import { JobService } from './job.service';
import { JobCreateDtoValidatorPipe } from './job.pipe';
import { MinioModule } from '../minio.module';

@Module({
  imports: [
    RedisModule,
    MinioModule,
    ProjectModule,
    TaskForceModule,
    EnvironmentModule,
  ],
  controllers: [JobController, JobDetailController],
  providers: [
    {
      provide: 'RobotExecutor',
      scope: Scope.REQUEST,
      useClass: DockerRobotExecutor,
    },
    JobCreateDtoValidatorPipe,
    JobRedisRepository,
    JobService,
  ],
})
export class JobModule {}
