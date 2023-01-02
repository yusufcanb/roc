import 'reflect-metadata';

import { Environment, TaskForce } from '@roc/core';
import { DockerRobotExecutor } from './index';

describe('core.executor', () => {
  describe('DockerRobotExecutor', () => {
    test('::execute()', async () => {
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
        repository: 'https://github.com/robotframework/RobotDemo',
        runner: 'roc-runner',
        selector: 'gherkin.robot',
      });

      const environment = Environment.fromPlainObject({
        id: 'dev',
        projectId: 'default-project',
        variables: {
          EXECUTED_FROM_ROC: true,
        },
      });

      const executor = new DockerRobotExecutor();
      await executor.execute(environment, taskForce, config);
    });
  });
});
