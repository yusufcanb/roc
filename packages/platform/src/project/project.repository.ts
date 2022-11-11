import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

import { Id, Project, ProjectRepository } from '@roc/core';

@Injectable()
export class ProjectRedisRepository implements ProjectRepository {
  @Inject('REDIS_CLIENT') private readonly redis: RedisClientType;

  count(): number {
    throw new Error('Method not implemented.');
  }

  existsById(id: Id): boolean {
    throw new Error('Method not implemented.');
  }

  getOneById(id: Id): Project {
    throw new Error('Method not implemented.');
  }

  delete(entity: Project): void {
    throw new Error('Method not implemented.');
  }

  deleteById(id: Id): void {
    throw new Error('Method not implemented.');
  }

  deleteAll(): void {
    throw new Error('Method not implemented.');
  }

  findAll(): Project[] {
    throw new Error('Method not implemented.');
  }

  findById(id: Id): Project {
    throw new Error('Method not implemented.');
  }

  save(entity: Project): Project {
    throw new Error('Method not implemented.');
  }
}
