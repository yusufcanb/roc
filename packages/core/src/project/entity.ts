import { BaseEntity, Taggable, TimeStampable } from '../commons';

export class Project extends BaseEntity implements Taggable, TimeStampable {
  private _createdAt: Date;
  private _updatedAt: Date;

  private _tags: string[];

  public get createdAt(): Date {
    return this._createdAt;
  }
  public set createdAt(value: Date) {
    this._createdAt = value;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
  public set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  public get tags(): string[] {
    return this._tags;
  }
  public set tags(value: string[]) {
    this._tags = value;
  }
}
