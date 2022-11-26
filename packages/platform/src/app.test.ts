import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let appModule: AppModule;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    appModule = moduleRef.get<AppModule>(AppModule);
  });

  it('::constructor()', async () => {
    expect(appModule).not.toBeNull();
  });

});
