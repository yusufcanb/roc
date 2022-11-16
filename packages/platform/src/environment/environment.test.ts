import { Test } from '@nestjs/testing';

import { EnvironmentRedisRepository } from './environment.repository';
import { RedisClientType } from 'redis';
import { RedisModule } from '../redis.module';

describe('environment repository tests', () => {
  let environmentRepository: EnvironmentRedisRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RedisModule],
      providers: [EnvironmentRedisRepository],
    }).compile();

    environmentRepository = moduleRef.get<EnvironmentRedisRepository>(
      EnvironmentRedisRepository,
    );
  });

  afterAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RedisModule],
    }).compile();

    const redis = moduleRef.get<RedisClientType>('REDIS_CLIENT');
    await redis.flushAll();
  });

  it('should return an array of environments', async () => {
    expect(await environmentRepository.findAll()).toBe([]);
  });

  it('should get environment by id', async () => {
    expect(await environmentRepository.findById('id')).toBe([]);
  });

  it('should return an array of environments', async () => {
    expect(await environmentRepository.findById).toBe([]);
  });
});
