import {Id} from "../../types";
import {DomainModel, Dto} from "../core/core.models";

export interface EnvironmentDTO extends Dto {
  projectId: Id;
  name: string;
  description: string;
  variables: Array<any>;
}

export class Environment extends DomainModel<EnvironmentDTO> {
  private _id!: Id;
  private _projectId!: Id;
  private _name!: string;
  private _description!: string;
  private _variables!: Array<any>;

  get id(): Id {
    return this._id;
  }

  set id(value: Id) {
    this._id = value;
  }

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

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get variables(): Array<any> {
    return this._variables;
  }

  set variables(value: Array<any>) {
    this._variables = value;
  }
}
