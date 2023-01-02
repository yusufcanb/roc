import { Environment } from '../environment';
import { TaskForce } from '../task-force';

export interface RobotExecutorConfig {
  minio: {
    endpoint: URL;
    accessKey: string;
    accessSecret: string;
    bucket: string;
  };
}

export interface RobotExecutor {
  execute(
    environment: Environment,
    taskForce: TaskForce,
    config?: RobotExecutorConfig,
  ): Promise<void>;

  executeMany(
    environment: Environment,
    taskForce: TaskForce,
    config?: RobotExecutorConfig,
  ): Promise<void>;
}
