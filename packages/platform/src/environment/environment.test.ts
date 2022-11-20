import { Test } from '@nestjs/testing';

import { EnvironmentRedisRepository } from './environment.repository';
import { RedisClientType } from 'redis';
import { RedisModule } from '../redis.module';
import { Id, Environment } from '@roc/core';

describe('EnvironmentRedisRepository', () => {
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

  afterEach(async () => {
    await redis.flushAll();
  });

  it('::count()', async () => {
    await redis.set("environment.1", "{}");
    await redis.set("environment.2", "{}");
    await redis.set("environment.3", "{}");
    
    // const mock = jest.spyOn((environmentRepository as any).redis, 'keys');
    // mock.mockImplementation(async (...args) => keysArr);

    expect(await environmentRepository.count()).toBe(3);
    // mock.mockClear();
  });

  it('::existsById(id: Id)', async () => {    
    const id: Id = 1;
    await redis.set(`environment.${id}`, "{}");

    const exists = await environmentRepository.existsById(id)
    expect(exists).toBeTruthy();
  });

  it('::getOneById(id: Id)', async () => {
    const env = new Environment();
    env.id = 'test-env';
    env.name = 'hello-world';
    env.variables = {};
    
    const saved = await environmentRepository.save(env)
    expect(saved).not.toBeNull();

    const fetched = await environmentRepository.getOneById(env.id);
    expect(fetched).not.toBeNull();
    expect(fetched).toBeInstanceOf(Environment);

    expect(fetched.id).toBe(saved.id);
  });

  it('::save(entity: Environment)', async () => {
    const env = new Environment();
    env.id = 'test-env';
    env.name = 'hello-world';
    env.variables = {};
    
    const saved = await environmentRepository.save(env)
    expect(saved).not.toBeNull();
  });
});
