/* eslint-disable @typescript-eslint/ban-types */

import { Id } from './types';

export abstract class BaseEntity {
  /** Identifier of the entity */
  private _id: Id;

  public get id(): Id {
    return this._id;
  }

  public set id(value: Id) {
    this._id = value;
  }

  /**
   * It takes a plain object and returns an instance of the class
   *
   * @param {any} obj - any - the object to convert
   * @returns An instance of the BaseEntity class.
   */
  static fromPlainObject(obj: any): BaseEntity {
    throw Error('No implementation found for BaseEntity::fromPlainObject(...)');
  }

  /**
   * It takes an instance of a class that extends `BaseEntity` and returns
   * a plain object representation of that instance
   *
   * @param {T} obj - T - The object to convert to a plain object.
   * @returns The plain object representation of the instance.
   */
  static toPlainObject(obj: any): BaseEntity {
    throw Error('No implementation found for BaseEntity::toPlainObject(...)');
  }
}
