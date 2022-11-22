import { Inject, Injectable } from '@nestjs/common';
import { TaskForce } from '@roc/core';
import { RedisClientType } from 'redis';
import { AbstractRedisRepository } from '../redis';

@Injectable()
export class TaskForceRedisRepository extends AbstractRedisRepository {
  @Inject('REDIS_CLIENT')
  readonly redis: RedisClientType;

  protected key = 'task-force';
  protected entity = TaskForce;
}
