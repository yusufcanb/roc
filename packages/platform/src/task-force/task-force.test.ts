import { Test } from '@nestjs/testing';

import { RedisClientType } from 'redis';
import {
  TaskForceModule,
  TaskForceRedisRepository,
  TaskForceService,
  TaskForceController,
} from '.';

describe('TaskForceRedisRepository', () => {
  let taskForceRepository: TaskForceRedisRepository;
  let redis: RedisClientType;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TaskForceModule],
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

describe('TaskForceService', () => {
  let taskForceService: TaskForceService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TaskForceModule],
      providers: [],
    }).compile();

    taskForceService = moduleRef.get<TaskForceService>(TaskForceService);
  });

  afterEach(async () => {});

  it('::constructor()', async () => {
    expect(await taskForceService).not.toBeNull();
  });

  it('::constructor()', async () => {
    const mock = jest.spyOn((taskForceService as any).repository, 'findAll');
    mock.mockImplementation(async (...args) => []);

    expect(await taskForceService.findAll()).toStrictEqual([]);
  });
});

describe('TaskForceController', () => {
  let taskForceController: TaskForceController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TaskForceModule],
      providers: [],
    }).compile();

    taskForceController =
      moduleRef.get<TaskForceController>(TaskForceController);
  });

  afterEach(async () => {});

  it('::constructor()', async () => {
    expect(await taskForceController).not.toBeNull();
  });

  it('::constructor()', async () => {
    const mock = jest.spyOn(
      (taskForceController as any).taskForceService,
      'findAll',
    );
    mock.mockImplementation(async (...args) => []);

    expect(await taskForceController.getTaskForces()).toStrictEqual([]);
  });
});
