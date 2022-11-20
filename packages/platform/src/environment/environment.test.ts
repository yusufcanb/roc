import { Test } from '@nestjs/testing';

import { EnvironmentRedisRepository } from './environment.repository';
import { RedisClientType } from 'redis';
import { RedisModule } from '../redis/redis.module';
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

  it('::save(entity: Environment)', async () => {
    const env = new Environment();
    env.id = 'test-env';
    env.name = 'hello-world';
    env.variables = {};

    const saved = await environmentRepository.save(env);
    expect(saved).not.toBeNull();
  });

  it('::count()', async () => {
    const length = 5;
    for (let index = 0; index < length; index++) {
      await redis.json.set(
        `environment.${index}`,
        '$',
        {},
      );
    }

    // const mock = jest.spyOn((environmentRepository as any).redis, 'keys');
    // mock.mockImplementation(async (...args) => keysArr);

    expect(await environmentRepository.count()).toBe(length);
    // mock.mockClear();
  });

  it('::existsById(id: Id)', async () => {
    const id: Id = 1;
    await redis.json.set(
      `environment.${id}`,
      '$',
      {},
    );

    const exists = await environmentRepository.existsById(id);
    expect(exists).toBeTruthy();
  });

  it('::getOneById(id: Id)', async () => {
    const env = new Environment();
    env.id = 'test-env';
    env.name = 'hello-world';
    env.variables = {};

    const saved = await environmentRepository.save(env);
    expect(saved).not.toBeNull();

    const fetched = await environmentRepository.getOneById(env.id);
    expect(fetched).not.toBeNull();
    expect(fetched).toBeInstanceOf(Environment);

    expect(fetched.id).toBe(saved.id);
  });

  it('::delete(entity: Environment)', async () => {
    const env = new Environment();
    env.id = 'test-env';
    env.name = 'hello-world';
    env.variables = {};

    const saved = await environmentRepository.save(env);
    expect(saved).not.toBeNull();
    expect(await redis.exists('environment.test-env')).toBeTruthy();

    await environmentRepository.delete(env);

    expect(await redis.exists('environment.test-env')).toBeFalsy();
  });

  it('::deleteById(id: Id)', async () => {
    const id = 1;
    await redis.json.set(`environment.${id}`, '$', { hello: 'world!' } as any);
    expect(await environmentRepository.existsById(id)).toBeTruthy();

    await environmentRepository.deleteById(id);

    expect(await redis.exists(`environment.${id}`)).toBeFalsy();
  });
});
