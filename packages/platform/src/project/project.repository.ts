import { Inject, Injectable } from '@nestjs/common';
import { Project } from '@roc/core';
import { RedisClientType } from 'redis';
import { AbstractRedisRepository } from '../redis';

@Injectable()
export class ProjectRedisRepository extends AbstractRedisRepository {
  @Inject('REDIS_CLIENT')
  readonly redis: RedisClientType;

  protected readonly key = 'project';
  protected entity = Project;
}
