import { Module, Logger } from '@nestjs/common';
import { createClient } from 'redis';

@Module({
  providers: [
    {
      provide: 'REDIS_OPTIONS',
      useValue: {
        url: 'redis://localhost:6379',
      },
    },
    {
      inject: ['REDIS_OPTIONS'],
      provide: 'REDIS_CLIENT',
      useFactory: async (options: { url: string }) => {
        try {
          const client = createClient(options);
          await client.connect();
          return client;
        } catch (err: any) {
          Logger.error('Redis connection failed.');
          process.exit(-1);
        }
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
