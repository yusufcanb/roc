import { Test } from '@nestjs/testing';
import { MinioModule } from './minio.module';

describe('MinioModule', () => {
  let minioModule: MinioModule;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [MinioModule],
      providers: [],
    })
      .overrideProvider('MINIO_OPTIONS')
      .useValue({
        endPoint: 'play.min.io',
        port: 9000,
        useSSL: true,
        accessKey: 'Q3AM3UQ867SPQQA43P2F',
        secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
      })
      .compile();

    minioModule = moduleRef.get<MinioModule>(MinioModule);
  });

  it('::constructor()', async () => {
    expect(minioModule).not.toBeNull();
    expect(minioModule).toBeInstanceOf(MinioModule);
  });
});
