import { BaseEntity, Id } from '../commons';

/**
 * Interface to represent the status of a Kubernetes Job
 */
interface JobStatus {
  active: boolean;
  succeeded: boolean;
  completionTime: string;
  startTime: string;
}

export class Job extends BaseEntity {
  private _taskForceId: Id;
  private _environmentId: Id;

  private _createdAt: Date;
  private _status: JobStatus;

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

  set createdAt(value: Date) {
    this._createdAt = value;
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
}
