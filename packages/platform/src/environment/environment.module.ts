import { Module } from '@nestjs/common';

import { RedisModule } from '../redis.module';
import { EnvironmentController } from './environment.controller';
import { EnvironmentRedisRepository } from './environment.repository';
import { EnvironmentService } from './environment.service';

@Module({
  imports: [RedisModule],
  controllers: [EnvironmentController],
  providers: [
    {
      provide: 'EnvironmentRepository',
      useClass: EnvironmentRedisRepository,
    },
    EnvironmentService,
  ],
})
export class EnvironmentModule {}
