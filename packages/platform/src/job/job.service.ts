import { Inject, Injectable } from '@nestjs/common';
import { Environment, Job, RobotExecutor, TaskForce } from '@roc/core';
import { JobRedisRepository } from './job.repository';

@Injectable()
export class JobService {
  @Inject()
  private readonly repository: JobRedisRepository;

  @Inject('RobotExecutor')
  private readonly executor: RobotExecutor;

  public async executeJob(job: Job) {
    const config = {
      minio: {
        endpoint: new URL('http://localhost:9000'),
        accessKey: 'roc',
        accessSecret: 'roc-minio-pwd',
        bucket: 'roc',
      },
    };

    const taskForce = TaskForce.fromPlainObject({
      id: 'task-force-1',
      projectId: 'default-project',
      repository: 'https://github.com/robocorp/example-locators.git',
      runner: 'roc-runner',
      selector: 'tasks.robot',
    });

    const environment = Environment.fromPlainObject({
      id: 'dev',
      projectId: 'default-project',
      variables: {
        debug: false,
        production: true,
        globals: {
          EXECUTED_FROM_ROC: true,
          REDIS_URL: 'redis://redis:5675',
        },
      },
    });

    return this.executor.execute(environment, taskForce, config);
  }
}
