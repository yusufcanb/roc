import { Test } from '@nestjs/testing';
import { TaskForceRepository } from '@roc/core';

import { RedisClientType } from 'redis';
import {
  TaskForceModule,
  TaskForceRedisRepository,
  TaskForceService,
  TaskForceController,
} from '.';
import { RedisModule } from '../redis';

describe('TaskForceRedisRepository', () => {
  let taskForceRepository: TaskForceRepository;
  let redis: RedisClientType;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [RedisModule, TaskForceModule],
      providers: [],
    }).compile();

    redis = moduleRef.get<RedisClientType>('REDIS_CLIENT');

    taskForceRepository = moduleRef.get<TaskForceRepository>(
      'TaskForceRepository',
    );
  });

  afterEach(async () => {
    await redis.flushAll();
  });

  it('::constructor()', async () => {
    expect(taskForceRepository).not.toBeNull();
    expect(taskForceRepository).toBeInstanceOf(TaskForceRedisRepository);
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

  it('::findAll()', async () => {
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

  it('::getTaskForces()', async () => {
    const mock = jest.spyOn(
      (taskForceController as any).taskForceService,
      'findAll',
    );
    mock.mockImplementation(async (...args) => []);

    expect(await taskForceController.getTaskForces()).toStrictEqual([]);
  });
});
