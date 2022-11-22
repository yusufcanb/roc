import { Inject, Injectable } from '@nestjs/common';
import { TaskForce } from '@roc/core';
import { TaskForceRedisRepository } from './task-force.repository';

@Injectable()
export class TaskForceService {
  @Inject('TaskForceRepository')
  private readonly repository: TaskForceRedisRepository;

  public async findAll(): Promise<TaskForce[]> {
    return await this.repository.findAll();
  }
}
