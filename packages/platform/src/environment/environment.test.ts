import { Test } from '@nestjs/testing';
import { RedisClientType } from 'redis';

import { Id, Environment } from '@roc/core';
import {
  EnvironmentModule,
  EnvironmentRedisRepository,
  EnvironmentService,
} from '../environment';

import { RedisModule } from '../redis/redis.module';

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
    const length = 5;
    for (let index = 0; index < length; index++) {
      await redis.json.set(`environment.${index}`, '$', {});
    }

    // const mock = jest.spyOn((environmentRepository as any).redis, 'keys');
    // mock.mockImplementation(async (...args) => keysArr);

    expect(await environmentRepository.count()).toBe(length);
    // mock.mockClear();
  });

  it('::existsById(id: Id)', async () => {
    const id: Id = 1;
    await redis.json.set(`environment.${id}`, '$', {});

    const exists = await environmentRepository.existsById(id);
    expect(exists).toBeTruthy();
  });

  it('::getOneById(id: Id)', async () => {
    const env = new Environment();
    env.id = 'test-env';
    env.projectId = 'default-project';
    env.variables = {};

    const saved = await environmentRepository.save(env);
    expect(saved).not.toBeNull();

    const fetched = await environmentRepository.getOneById(
      `${env.projectId}.${env.id}`,
    );
    expect(fetched).not.toBeNull();
    expect(fetched).toBeInstanceOf(Environment);

    expect(fetched.id).toBe(saved.id);
  });

  it('::delete(entity: Environment)', async () => {
    const env = new Environment();
    env.id = 'test-env';
    env.projectId = 'default-project';
    env.variables = {};

    const saved = await environmentRepository.save(env);
    expect(saved).not.toBeNull();
    expect(
      await redis.exists(`environment.${env.projectId}.${env.id}`),
    ).toBeTruthy();

    await environmentRepository.delete(env);

    expect(
      await redis.exists(`environment.${env.projectId}.${env.id}`),
    ).toBeFalsy();
  });

  it('::deleteById(id: Id)', async () => {
    const id = 1;

    await redis.json.set(`environment.default-project.${id}`, '$', {
      hello: 'world!',
    } as any);
    expect(
      await environmentRepository.existsById(`default-project.${id}`),
    ).toBeTruthy();

    await environmentRepository.deleteById(id);

    expect(
      await environmentRepository.existsById(
        `environment.default-project.${id}`,
      ),
    ).toBeFalsy();
  });

  it('::deleteAll()', async () => {
    const length = 5;
    for (let index = 0; index < length; index++) {
      await redis.json.set(`environment.${index}`, '$', {});
    }

    expect(await environmentRepository.count()).toBe(length);
    await environmentRepository.deleteAll();
    expect(await environmentRepository.count()).toBe(0);
  });

  it('::findAll()', async () => {
    const length = 5;
    for (let index = 0; index < length; index++) {
      await redis.json.set(`environment.${index}`, '$', {});
    }

    const environments: Environment[] = await environmentRepository.findAll();

    expect(environments.length).toBe(length);
  });

  it('::findById()', async () => {
    const nonExistId = 'non-exists';

    const environment = await environmentRepository.findById(nonExistId);
    expect(environment).toBeNull();
  });

  it('::save(entity: Environment)', async () => {
    const env = new Environment();
    env.id = 'test-env';
    env.projectId = 'default-project';
    env.variables = {};

    const saved = await environmentRepository.save(env);
    expect(saved).not.toBeNull();
  });
});

describe('EnvironmentService', () => {
  let environmentService: EnvironmentService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EnvironmentModule],
    }).compile();

    environmentService = moduleRef.get<EnvironmentService>(EnvironmentService);
  });

  afterEach(async () => {});

  it('::findAll()', async () => {
    const mock = jest.spyOn((environmentService as any).repository, 'findAll');
    mock.mockImplementation(async (...args) => []);

    expect(await environmentService.findAllByProjectId(-1)).toStrictEqual([]);
    mock.mockClear();
  });
});
