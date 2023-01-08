import { Module } from '@nestjs/common';

import { RedisModule } from '../redis/redis.module';
import { TaskForceController } from './task-force.controller';
import { TaskForceRedisRepository } from './task-force.repository';
import { TaskForceService } from './task-force.service';

@Module({
  imports: [RedisModule],
  controllers: [TaskForceController],
  providers: [
    {
      provide: 'TaskForceRepository',
      useClass: TaskForceRedisRepository,
    },
    TaskForceService,
  ],
  exports: [TaskForceService],
})
export class TaskForceModule {}
