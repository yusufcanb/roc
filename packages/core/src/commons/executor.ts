import { ParsedPath } from 'path';
import { Environment } from '../environment';
import { TaskForce } from '../task-force';
import { Id } from './types';

export interface RobotExecutorConfig {
  jobId: Id;
  environment: Environment;
  taskForce: TaskForce | TaskForce[];
  minio: {
    endpoint: URL;
    accessKey: string;
    accessSecret: string;
    bucket: string;
  };
}

export interface RobotExecutor {
  /**
   * Executes a task force in the given environment.
   * @param config - A configuration object for the execution.
   * @returns A promise that resolves when the task has been completed.
   */
  execute(config: RobotExecutorConfig): Promise<ExecutorResult>;

  /**
   * Executes many task forces in the given environment
   * @param config - A configuration object for the execution.
   * @returns A promise that resolves when all tasks have been completed.
   */
  executeMany(config?: RobotExecutorConfig): Promise<ExecutorResult>;
}

export interface ExecutorResult {
  isErrored: boolean;
  isSucceeded: boolean;
  stdout: string;
  completedAt: Date;

  logUrl: ParsedPath;
  reportUrl: ParsedPath;
  outputUrl: ParsedPath;
}
