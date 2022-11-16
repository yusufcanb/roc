import { instanceToPlain, plainToInstance } from "class-transformer";

import { BaseEntity, Taggable } from "../commons";

export class Environment extends BaseEntity implements Taggable {
  private _projectId: string;

  private _name: string;
  private _description: string;
  private _tags: string[];

  private _variables: object;

  public get projectId(): string {
    return this._projectId;
  }

  public set projectId(value: string) {
    this._projectId = value;
  }

  /**
   * Name of the environment. Should compily with the slug naming convention.
   * e.g. dev-1, eu-west-1-dev
   */
  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  /**
   * Long description of the environment.
   * e.g. global operational contants west-europe-1 region
   */
  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }

  /**
   * Environment tags
   * e.g. ["dev", "eu-west-1", "mock"]
   */
  public get tags(): string[] {
    return this._tags;
  }

  public set tags(value: string[]) {
    this._tags = value;
  }

  /**
   * Environment variables
   * e.g {"PING": "pong"}
   */
  public get variables() {
    return this._variables;
  }

  public set variables(variables: object) {
    this._variables = variables;
  }

  /**
   * It takes a plain object and returns an instance of the class
   *
   * @param {any} obj - any - the object to convert
   * @returns An instance of the Environment class.
   */
  public static fromPlainObject(obj: any): Environment {
    return plainToInstance(Environment, obj);
  }

  /**
   * It takes an instance of a class that extends `Environment` and returns
   * a plain object representation of that instance
   *
   * @param {T} obj - T - The object to convert to a plain object.
   * @returns The plain object representation of the instance.
   */
  public static toPlainObject<T extends Environment>(obj: T): any {
    return instanceToPlain(obj);
  }
}
