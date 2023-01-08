import { Module } from '@nestjs/common';

import { ProjectModule } from '../project';
import { RedisModule } from '../redis/redis.module';

import {
  EnvironmentController,
  EnvironmentDetailController,
} from './environment.controller';
import { EnvironmentRedisRepository } from './environment.repository';
import { EnvironmentService } from './environment.service';

@Module({
  imports: [RedisModule, ProjectModule],
  controllers: [EnvironmentController, EnvironmentDetailController],
  providers: [EnvironmentRedisRepository, EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
