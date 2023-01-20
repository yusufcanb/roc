import { Inject, Injectable } from '@nestjs/common';
import {
  Id,
  TaskForce,
  TaskForceCreateDto,
  TaskForceRetrieveDto,
  TaskForceUpdateDto,
} from '@roc/core';
import { TaskForceRedisRepository } from './task-force.repository';

@Injectable()
export class TaskForceService {
  @Inject('TaskForceRepository')
  private readonly repository: TaskForceRedisRepository;

  public async existsWithInProject(
    projectId: Id,
    taskForceId: Id,
  ): Promise<boolean> {
    return await this.repository.existsById(`${projectId}.${taskForceId}`);
  }

  public async getTaskForceById(
    projectId: Id,
    id: Id,
    asDto?: boolean,
  ): Promise<TaskForce | TaskForceRetrieveDto> {
    if (asDto) {
      return TaskForceRetrieveDto.from(
        await this.repository.getOneById(`${projectId}.${id}`),
      );
    } else {
      await this.repository.getOneById(`${projectId}.${id}`);
    }
  }

  public async findAllByProjectId(projectId: Id): Promise<TaskForce[]> {
    return await this.repository.findByKey(`${projectId}.*`);
  }

  public async createNewEnvironment(
    projectId: Id,
    taskForceCreateDto: TaskForceCreateDto,
  ): Promise<TaskForce> {
    const taskForce = TaskForce.fromPlainObject(taskForceCreateDto);
    taskForce.projectId = projectId;
    return this.repository.save(taskForce);
  }

  public async updateTaskForceByIds(
    projectId: Id,
    environmentId: Id,
    dto: TaskForceUpdateDto,
  ) {
    const taskForce: TaskForce = await this.repository.getOneById(
      `${projectId}.${environmentId}`,
    );

    taskForce.description = dto.description;
    taskForce.runner = dto.runner;
    taskForce.repository = dto.repository;
    taskForce.selector = dto.selector;
    taskForce.include = dto.include;

    taskForce.tags = dto.tags;

    this.repository.save(taskForce);
    return taskForce;
  }

  public async deleteTaskForce(projectId: Id, id: Id) {
    return this.repository.deleteById(`${projectId}.${id}`);
  }
}
