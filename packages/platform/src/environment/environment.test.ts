import { Test } from '@nestjs/testing';

import { EnvironmentRedisRepository } from './environment.repository';
import { RedisClientType } from 'redis';
import { RedisModule } from '../redis.module';
import { Environment } from '@roc/core';

describe('environment repository tests', () => {
  let environmentRepository: EnvironmentRedisRepository;
  let redis: RedisClientType;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RedisModule],
      providers: [EnvironmentRedisRepository],
    }).compile();

    redis = moduleRef.get<RedisClientType>('REDIS_CLIENT');

    environmentRepository = moduleRef.get<EnvironmentRedisRepository>(
      EnvironmentRedisRepository,
    );
  });

  afterAll(async () => {
    await redis.flushAll();
  });

  it('should return environment entity count', async () => {
    await redis.set(
      `${EnvironmentRedisRepository.STORE_KEY}.count-test`,
      '$',
      {},
    );
    expect(await environmentRepository.count()).toBe(1);
  });

  it('should save an environment entity', async () => {
    const env = new Environment();
    env.id = 'test-env';
    env.name = 'hello-world';
    env.variables = {};
    expect(await environmentRepository.save(env));
  });
});
