import { Module } from '@nestjs/common';

import { RedisModule } from '../redis.module';
import { EnvironmentController } from './environment.controller';
import { EnvironmentRedisRepository } from './environment.repository';

@Module({
  imports: [RedisModule],
  controllers: [EnvironmentController],
  providers: [{
    provide: "EnvironmentRepository",
    useClass: EnvironmentRedisRepository
  }],
})
export class EnvironmentModule { }
