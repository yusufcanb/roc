import { instanceToPlain, plainToInstance } from 'class-transformer';
import { BaseEntity, Id } from '../commons';

/**
 * Interface to represent the status of a Kubernetes Job
 */
export interface JobStatus {
  isActive: boolean;
  isSucceeded: boolean;
  isErrored: boolean;
}

export interface JobResult {
  logUrl: string;
  reportUrl: string;
  outputUrl: string;
  stdout: string;
  completedAt: Date;
}

export class Job extends BaseEntity {
  private _projectId: Id;
  private _taskForceId: Id;
  private _environmentId: Id;

  private _createdAt: Date;

  private _status: JobStatus;
  private _result: JobResult;

  public get projectId(): Id {
    return this._projectId;
  }

  public set projectId(value: Id) {
    this._projectId = value;
  }

  /**
   * Task force id of the Job
   */
  get taskForceId(): Id {
    return this._taskForceId;
  }

  set taskForceId(value: Id) {
    this._taskForceId = value;
  }

  get environmentId(): Id {
    return this._environmentId;
  }

  set environmentId(value: Id) {
    this._environmentId = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date | string) {
    if (value instanceof Date) {
      this._createdAt = value;
    } else {
      this._createdAt = new Date(value);
    }
  }

  /**
   * K8s Job Status object
   */
  get status(): JobStatus {
    return this._status;
  }

  set status(value: JobStatus) {
    this._status = value;
  }

  /**
   * Job result
   */
  get result(): JobResult {
    return this._result;
  }

  set result(value: JobResult) {
    this._result = value;
  }

  /**
   * It takes a plain object and returns an instance of the class
   *
   * @param {any} obj - any - the object to convert
   * @returns An instance of the Job class.
   */
  public static fromPlainObject(obj: Partial<Job>): Job {
    return plainToInstance(Job, obj, { ignoreDecorators: true });
  }

  /**
   * It takes an instance of a class that extends `Job` and returns
   * a plain object representation of that instance
   *
   * @param {T} obj - T - The object to convert to a plain object.
   * @returns The plain object representation of the instance.
   */
  public static toPlainObject<T extends Job>(obj: T): any {
    return instanceToPlain(obj, {
      strategy: 'excludeAll',
      enableImplicitConversion: true,
    });
  }
}
