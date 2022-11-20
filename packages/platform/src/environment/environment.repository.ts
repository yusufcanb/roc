import { Inject, Injectable } from '@nestjs/common';
import { Environment } from '@roc/core';
import { RedisClientType } from 'redis';

import { AbstractRedisRepository } from '../redis/redis.repository';

@Injectable()
export class EnvironmentRedisRepository extends AbstractRedisRepository {
  @Inject('REDIS_CLIENT')
  protected readonly redis: RedisClientType;

  protected readonly key: string = 'environment';
  protected readonly entity: new () => Environment = Environment;
}
