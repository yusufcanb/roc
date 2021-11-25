import {DomainModel, Dto} from "../core/core.models";
import {Id} from "../../types";
import {environment} from "../../environments/environment";

export interface TaskForceDto extends Dto {
  projectId: Id;

  name: string;
  sourceType: string;
  repositoryUrl: string;
  packageUrl: string;

}

export class TaskForce extends DomainModel<TaskForceDto> {
  private _id!: Id;
  private _name!: string;
  private _sourceType!: string;
  private _repositoryUrl!: string;
  private _packageUrl!: string;

  get id(): Id {
    return this._id;
  }

  set id(value: Id) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get sourceType(): string {
    return this._sourceType;
  }

  set sourceType(value: string) {
    this._sourceType = value;
  }

  get repositoryUrl(): string {
    return this._repositoryUrl;
  }

  set repositoryUrl(value: string) {
    this._repositoryUrl = value;
  }

  get packageUrl(): string {
    return `${environment.objectStorageService}/${this._packageUrl}`;
  }

  set packageUrl(value: string) {
    this._packageUrl = value;
  }

}
