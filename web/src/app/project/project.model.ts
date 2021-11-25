import {Id, Nullable} from "../../types";


export interface GlobalVariableDTO {
  id: Id;
  globalKey: string;
  globalValue: string;
  type: string;
  hidden: boolean;
  encrypted: boolean;
}

export interface CodeRepositoryDTO {
  id: Id;
  projectId: Id;

  path: string;
  isInitialized: boolean;
}

export interface ProjectDTO {
  id: Id;
  name: string;
  slug: string;
  type: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  repository: Nullable<CodeRepositoryDTO>;
  globalVariables: Array<GlobalVariableDTO>;
}

export class Project {
  private _id!: Id;
  private _name!: string;
  private _slug!: string;
  private _type!: string;
  private _isDefault!: boolean;

  private _createdAt!: Date;
  private _updatedAt!: Date;

  private _repository!: Nullable<CodeRepositoryDTO>;

  private _globalVariables!: Array<GlobalVariableDTO>;

  constructor(obj?: ProjectDTO) {
    if (obj !== undefined) {
      for (let element in obj) {
        // @ts-ignore
        this[element] = obj[element];
      }
    }
  }

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

  get slug(): string {
    return this._slug;
  }

  set slug(value: string) {
    this._slug = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get isDefault(): boolean {
    return this._isDefault;
  }

  set isDefault(value: boolean) {
    this._isDefault = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  get repository(): Nullable<CodeRepositoryDTO> {
    return this._repository;
  }

  set repository(value: Nullable<CodeRepositoryDTO>) {
    this._repository = value;
  }

  get globalVariables(): Array<GlobalVariableDTO> {
    return this._globalVariables;
  }

  set globalVariables(value: Array<GlobalVariableDTO>) {
    this._globalVariables = value;
  }
}
