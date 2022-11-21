import { Test } from '@nestjs/testing';

import { RedisClientType } from 'redis';
import { RedisModule } from '../redis/redis.module';
import { ProjectRedisRepository } from './project.repository';

describe('ProjectRedisRepository', () => {
  let projectRepository: ProjectRedisRepository;
  let redis: RedisClientType;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RedisModule],
      providers: [ProjectRedisRepository],
    }).compile();

    redis = moduleRef.get<RedisClientType>('REDIS_CLIENT');

    projectRepository = moduleRef.get<ProjectRedisRepository>(
      ProjectRedisRepository,
    );
  });

  afterEach(async () => {
    await redis.flushAll();
  });

  it('::constructor()', async () => {
    expect(await projectRepository).not.toBeNull();
  });
});
