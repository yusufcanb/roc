import {Id} from "../../types";
import {DomainModel, Dto} from "../core/core.models";

export interface AgentDTO extends Dto {
  projectId: Id;
  displayName: string;
  os: string;
}

export class Agent extends DomainModel<AgentDTO> {
  private _id!: Id;
  private _displayName!: string;
  private _os!: string;

  get id(): Id {
    return this._id;
  }

  set id(value: Id) {
    this._id = value;
  }

  get displayName(): string {
    return this._displayName;
  }

  set displayName(value: string) {
    this._displayName = value;
  }

  get os(): string {
    return this._os;
  }

  set os(value: string) {
    this._os = value;
  }

}
