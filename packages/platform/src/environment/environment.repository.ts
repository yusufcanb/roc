import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

import { Environment, EnvironmentRepository, Id } from '@roc/core';

@Injectable()
export class EnvironmentRedisRepository implements EnvironmentRepository {
  @Inject('REDIS_CLIENT') private readonly redis: RedisClientType;

  count(): number {
    throw new Error('Method not implemented.');
  }
  existsById(id: Id): boolean {
    throw new Error('Method not implemented.');
  }
  getOneById(id: Id): Environment {
    throw new Error('Method not implemented.');
  }
  delete(entity: Environment): void {
    throw new Error('Method not implemented.');
  }
  deleteById(id: Id): void {
    throw new Error('Method not implemented.');
  }
  deleteAll(): void {
    throw new Error('Method not implemented.');
  }
  findAll(): Environment[] {
    throw new Error('Method not implemented.');
  }
  findById(id: Id): Environment {
    throw new Error('Method not implemented.');
  }
  save(entity: Environment): Environment {
    throw new Error('Method not implemented.');
  }
}
