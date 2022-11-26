import { Test } from '@nestjs/testing';

import { RedisClientType } from 'redis';
import { RedisModule } from '../redis/redis.module';
import {
  ProjectModule,
  ProjectController,
  ProjectDetailController,
  ProjectRedisRepository,
} from '.';

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

describe('ProjectController', () => {
  let projectController: ProjectController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProjectModule],
      providers: [],
    }).compile();

    projectController = moduleRef.get<ProjectController>(ProjectController);
  });

  it('::constructor()', async () => {
    expect(await projectController).not.toBeNull();
  });
});
