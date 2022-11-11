import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class AppService {

  @Inject('REDIS_CLIENT') private readonly redis: RedisClientType;

  getHello(): string {
    return 'Hello World!';
  }
  
}
