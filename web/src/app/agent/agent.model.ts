import {Id} from "../../types";
import {DomainModel, Dto} from "../core/core.models";

export interface AgentDTO extends Dto {
  projectId: Id;
  displayName: string;
  os: number;
  lastActive: string;
}

export class Agent extends DomainModel<AgentDTO> {
  private _id!: Id;
  private _displayName!: string;
  private _os!: number;
  private _lastActive!: Date;

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

  get os(): number {
    return this._os;
  }

  set os(value: number) {
    this._os = value;
  }

  get lastActive(): Date {
    return this._lastActive;
  }

  set lastActive(value: Date) {
    this._lastActive = value
  }

  setLastActive(value: string) {
    this._lastActive = new Date(value);
  }
}
