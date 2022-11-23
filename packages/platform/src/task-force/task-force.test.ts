import { Test } from '@nestjs/testing';

import { RedisClientType } from 'redis';
import { RedisModule } from '../redis/redis.module';
import { TaskForceRedisRepository } from './task-force.repository';

describe('ProjectRedisRepository', () => {
  let taskForceRepository: TaskForceRedisRepository;
  let redis: RedisClientType;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RedisModule],
      providers: [TaskForceRedisRepository],
    }).compile();

    redis = moduleRef.get<RedisClientType>('REDIS_CLIENT');

    taskForceRepository = moduleRef.get<TaskForceRedisRepository>(
      TaskForceRedisRepository,
    );
  });

  afterEach(async () => {
    await redis.flushAll();
  });

  it('::constructor()', async () => {
    expect(await taskForceRepository).not.toBeNull();
  });
});
