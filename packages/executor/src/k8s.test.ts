import 'reflect-metadata';

import { Environment, TaskForce } from '@roc/core';
import { K8sRobotExecutor } from './k8s';

function _generateRandomHexString(): string {
  const hexChars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
  }
  return result;
}

describe('core.executor', () => {
  describe('K8sRobotExecutor', () => {
    test('::execute()', async () => {
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
        jobId: `demo-${_generateRandomHexString()}`,
        taskForce: taskForce,
        environment: environment,
        minio: {
          endpoint: new URL('http://localhost:9000'),
          accessKey: 'roc',
          accessSecret: 'roc-minio-pwd',
          bucket: 'roc',
        },
      };

      const executor = new K8sRobotExecutor();
      await executor.execute(config as any);
    });
  });
});
