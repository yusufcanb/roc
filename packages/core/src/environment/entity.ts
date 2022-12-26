import { Expose, instanceToPlain, plainToInstance } from 'class-transformer';

import { BaseEntity, Id, Taggable } from '../commons';

export class Environment extends BaseEntity implements Taggable {
  private _projectId: Id;

  private _description: string;
  private _tags: string[] = [];
  private _variables = {};

  public get key(): string {
    return `${this.projectId}.${this.id}`;
  }

  @Expose()
  public get projectId(): Id {
    return this._projectId;
  }

  public set projectId(value: Id) {
    this._projectId = value;
  }

  /**
   * Long description of the environment.
   * e.g. global operational contants west-europe-1 region
   */
  @Expose()
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
  @Expose()
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
  @Expose()
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
  public static fromPlainObject(obj: Partial<Environment>): Environment {
    return plainToInstance(Environment, obj, { ignoreDecorators: true });
  }

  /**
   * It takes an instance of a class that extends `Environment` and returns
   * a plain object representation of that instance
   *
   * @param {T} obj - T - The object to convert to a plain object.
   * @returns The plain object representation of the instance.
   */
  public static toPlainObject<T extends Environment>(obj: T): any {
    return instanceToPlain(obj, {
      strategy: 'excludeAll',
      enableImplicitConversion: true,
    });
  }
}
