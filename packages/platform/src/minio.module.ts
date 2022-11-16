import { Module } from '@nestjs/common';
import { Client, ClientOptions } from 'minio';

@Module({
  providers: [
    {
      provide: 'MINIO_OPTIONS',
      useValue: {
        endPoint: process.env.S3_HOST,
        port: parseInt(process.env.S3_PORT),
        useSSL: false,
        accessKey: process.env.S3_ACCESS_KEY,
        secretKey: process.env.S3_SECRET_KEY,
      },
    },
    {
      inject: ['MINIO_OPTIONS'],
      provide: 'MINIO_CLIENT',
      useFactory: async (options: ClientOptions) => {
        const minioClient = new Client(options);
        return minioClient;
      },
    },
  ],
  exports: ['MINIO_CLIENT'],
})
export class MinioModule {}
