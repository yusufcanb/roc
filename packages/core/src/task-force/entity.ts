import { BaseEntity, Taggable } from '../commons';

export class TaskForce extends BaseEntity implements Taggable {
  /**
   * Project id of the environment.
   */
  get projectId(): string {
    return this._projectId;
  }

  set projectId(value: string) {
    this._projectId = value;
  }

  private _projectId: string;

  /**
   * The name of the top-level task suite
   */
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _name: string;

  /**
   * Detailed description of the task force's purpose.
   */
  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  private _description: string;

  /**
   * Git repository url of the Robot Framework project
   * For instance; `https://github.com/yusufcanb/roc.git`
   */
  get repository(): string {
    return this._repository;
  }

  set repository(value: string) {
    this._repository = value;
  }

  private _repository: string;

  /**
   * Docker image for execution environment.
   * For instance; `ghcr.io/yusufcanb/roc-runner:latest`
   */
  get runner(): string {
    return this._runner;
  }

  set runner(value: string) {
    this._runner = value;
  }

  private _runner: string;

  /**
   * Regex pattern to filter robots to be executed
   * For instance; `^tasks/[a-z0-9]+(?:-[a-z0-9]+)*$`
   */
  get selector(): string {
    return this._selector;
  }

  set selector(value: string) {
    this._selector = value;
  }

  private _selector: string;

  /**
   * Include tag pattern for robot scripts
   * For instance, `xNOTyANDz`
   */
  get include(): string {
    return this._include;
  }

  set include(value: string) {
    this._include = value;
  }

  private _include: string;

  /**
   * Tags for labelling the task force
   * For instance, `["prod", "integration", "api"]`
   * @returns List of tags
   */
  get tags(): string[] {
    return this._tags;
  }

  set tags(value: string[]) {
    this._tags = value;
  }

  private _tags: string[];
}
