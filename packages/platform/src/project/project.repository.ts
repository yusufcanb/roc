import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

import { Id, Project, ProjectRepository } from '@roc/core';

@Injectable()
export class ProjectRedisRepository implements ProjectRepository {
  @Inject('REDIS_CLIENT') private readonly redis: RedisClientType;

  count(): Promise<number> {
    throw new Error('Method not implemented.');
  }

  existsById(id: Id): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  getOneById(id: Id): Promise<Project> {
    throw new Error('Method not implemented.');
  }

  delete(entity: Project): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteById(id: Id): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteAll(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Project[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: Id): Promise<Project> {
    throw new Error('Method not implemented.');
  }

  save(entity: Project): Promise<Project> {
    throw new Error('Method not implemented.');
  }
}
