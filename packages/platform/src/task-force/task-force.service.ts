import { Inject, Injectable } from '@nestjs/common';
import { Id, TaskForce, TaskForceCreateDto } from '@roc/core';
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
}
