import {DomainModel, Dto} from "../core/core.models";
import {Id} from "../../types";
import {Environment} from "../environment/environment.model";
import {TaskForce} from "../task-force/task-force.model";
import {Agent} from "../agent/agent.model";
import {environment} from "../../environments/environment";

export interface JobDto extends Dto {
  projectId: Id;

  name: string;
  status: string;
  reportUrl: string;

  environment: Environment;
  agent: Agent;
  taskForce: TaskForce;

}

export class Job extends DomainModel<JobDto> {

  private _id!: Id;
  private _projectId!: Id;
  private _name!: string;
  private _status!: string;
  private _environment!: Environment;
  private _agent!: Agent;
  private _taskForce!: TaskForce;

  private _reportUrl!: string;

  get projectId(): Id {
    return this._projectId;
  }

  set projectId(value: Id) {
    this._projectId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get environment(): Environment {
    return this._environment;
  }

  set environment(value: Environment) {
    this._environment = value;
  }

  get agent(): Agent {
    return this._agent;
  }

  set agent(value: Agent) {
    this._agent = value;
  }

  get taskForce(): TaskForce {
    return this._taskForce;
  }

  set taskForce(value: TaskForce) {
    this._taskForce = value;
  }

  get id(): Id {
    return this._id;
  }

  set id(value: Id) {
    this._id = value;
  }

  get reportUrl(): string {
    return `${environment.objectStorageService}/${this._reportUrl}`;
  }

  set reportUrl(value: string) {
    this._reportUrl = value;
  }
}
