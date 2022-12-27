import { Expose, instanceToPlain, plainToClass } from 'class-transformer';
import { BaseEntity, Taggable } from '../commons';

export class TaskForce extends BaseEntity implements Taggable {
  private _projectId: string;

  private _description: string;
  private _repository: string;
  private _runner: string;
  private _selector: string;
  private _include: string;

  private _tags: string[];

  /**
   * Project id of the environment.
   */
  @Expose()
  get projectId(): string {
    return this._projectId;
  }

  set projectId(value: string) {
    this._projectId = value;
  }

  /**
   * Detailed description of the task force's purpose.
   */
  @Expose()
  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  /**
   * Git repository url of the Robot Framework project
   * For instance; `https://github.com/yusufcanb/roc.git`
   */
  @Expose()
  get repository(): string {
    return this._repository;
  }

  set repository(value: string) {
    this._repository = value;
  }

  /**
   * Docker image for execution environment.
   * For instance; `ghcr.io/yusufcanb/roc-runner:latest`
   */
  @Expose()
  get runner(): string {
    return this._runner;
  }

  set runner(value: string) {
    this._runner = value;
  }

  /**
   * Regex pattern to filter robots to be executed
   * For instance; `^tasks/[a-z0-9]+(?:-[a-z0-9]+)*$`
   */
  @Expose()
  get selector(): string {
    return this._selector;
  }

  set selector(value: string) {
    this._selector = value;
  }

  /**
   * Include tag pattern for robot scripts
   * For instance, `xNOTyANDz`
   */
  @Expose()
  get include(): string {
    return this._include;
  }

  set include(value: string) {
    this._include = value;
  }

  /**
   * Tags for labelling the task force
   * For instance, `["prod", "integration", "api"]`
   * @returns List of tags
   */
  @Expose()
  get tags(): string[] {
    return this._tags;
  }

  set tags(value: string[]) {
    this._tags = value;
  }

  /**
   * It takes a plain object and returns an instance of the class
   *
   * @param {any} obj - any - the object to convert
   * @returns An instance of the Environment class.
   */
  public static fromPlainObject(obj: Partial<TaskForce>): TaskForce {
    return plainToClass(TaskForce, obj, { ignoreDecorators: true });
  }

  /**
   * It takes an instance of a class that extends `Environment` and returns
   * a plain object representation of that instance
   *
   * @param {T} obj - T - The object to convert to a plain object.
   * @returns The plain object representation of the instance.
   */
  public static toPlainObject<T extends TaskForce>(obj: T): any {
    return instanceToPlain(obj, {
      strategy: 'excludeAll',
      enableImplicitConversion: true,
    });
  }
}
