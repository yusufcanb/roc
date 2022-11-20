/* eslint-disable @typescript-eslint/ban-types */
export abstract class BaseEntity {
  /** Identifier of the entity */
  private _id: string;

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public static fromPlainObject(obj: any): BaseEntity {
    throw new Error('No implementation found for fromPlainObject(...)');
  }
}
