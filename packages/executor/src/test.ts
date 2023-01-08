import 'reflect-metadata';

import { Environment, TaskForce } from '@roc/core';
import { DockerRobotExecutor } from './index';
import { Client } from 'minio';

describe('core.executor', () => {
  describe('DockerRobotExecutor', () => {
    test('::execute()', async () => {
      const minioClient = new Client({
        endPoint: 'minio',
        port: 9000,
        accessKey: 'roc',
        secretKey: 'roc-minio-pwd',
      });

      const taskForce = TaskForce.fromPlainObject({
        id: 'task-force-1',
        projectId: 'default-project',
        repository: 'https://github.com/robocorp/example-locators.git',
        runner: 'ghcr.io/yusufcanb/roc-runner:latest',
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

      const config = {
        taskForce: taskForce,
        environment: environment,
        minio: {
          endpoint: new URL('http://localhost:9000'),
          accessKey: 'roc',
          accessSecret: 'roc-minio-pwd',
          bucket: 'roc',
        },
      };

      const executor = new DockerRobotExecutor();
      await executor.execute(config as any);
    });
  });
});
