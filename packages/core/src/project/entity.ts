import { Expose, instanceToPlain, plainToClass } from 'class-transformer';
import { BaseEntity, Taggable, TimeStampable } from '../commons';

export class Project extends BaseEntity implements Taggable, TimeStampable {
  private _description: string;

  private _createdAt: Date = null;
  private _updatedAt: Date = null;

  private _tags: string[];

  @Expose()
  public get description() {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }

  @Expose()
  public get createdAt(): Date {
    return this._createdAt;
  }

  public set createdAt(value: Date | string) {
    if (value instanceof Date) {
      this._createdAt = value;
    } else {
      this._createdAt = new Date(value);
    }
  }

  @Expose()
  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public set updatedAt(value: Date | string) {
    if (value instanceof Date) {
      this._updatedAt = value;
    } else {
      this._updatedAt = new Date(value);
    }
  }

  @Expose()
  public get tags(): string[] {
    return this._tags;
  }

  public set tags(value: string[]) {
    this._tags = value;
  }

  /**
   * It takes a plain object and returns an instance of the class
   *
   * @param {any} obj - any - the object to convert
   * @returns An instance of the Environment class.
   */
  public static fromPlainObject(obj: Partial<Project>): Project {
    return plainToClass(Project, obj, { ignoreDecorators: true });
  }

  /**
   * It takes an instance of a class that extends `Environment` and returns
   * a plain object representation of that instance
   *
   * @param {T} obj - T - The object to convert to a plain object.
   * @returns The plain object representation of the instance.
   */
  public static toPlainObject<T extends Project>(obj: T): any {
    return instanceToPlain(obj, {
      strategy: 'excludeAll',
      enableImplicitConversion: true,
    });
  }
}
