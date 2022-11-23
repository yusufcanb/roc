import { Inject, Injectable } from '@nestjs/common';
import { Project, ProjectRepository } from '@roc/core';
import { RedisClientType } from 'redis';
import { AbstractRedisRepository } from '../redis';

@Injectable()
export class ProjectRedisRepository
  extends AbstractRedisRepository
  implements ProjectRepository
{
  @Inject('REDIS_CLIENT')
  readonly redis: RedisClientType;

  protected readonly key = 'project';
  protected entity = Project;
}
