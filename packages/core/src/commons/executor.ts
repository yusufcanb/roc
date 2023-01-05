import { Client as MinioClient } from 'minio';
import { RedisClientType } from 'redis';
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
  /**
   * Initializes the executor with a Redis client and a Minio client.
   * @param redis - The Redis client to use.
   * @param minio - The Minio client to use.
   */
  init(redis: RedisClientType, minio: MinioClient);

  /**
   * Executes a task force in the given environment.
   * @param environment - The environment in which to execute the task.
   * @param taskForce - The task force to use for execution.
   * @param config - An optional configuration object for the execution.
   * @returns A promise that resolves when the task has been completed.
   */
  execute(
    environment: Environment,
    taskForce: TaskForce,
    config?: RobotExecutorConfig,
  ): Promise<void>;

  /**
   * Executes many task forces in the given environment
   * @param environment - The environment in which to execute the tasks.
   * @param taskForce - The task force to use for execution.
   * @param config - An optional configuration object for the execution.
   * @returns A promise that resolves when all tasks have been completed.
   */
  executeMany(
    environment: Environment,
    taskForce: TaskForce,
    config?: RobotExecutorConfig,
  ): Promise<void>;
}
