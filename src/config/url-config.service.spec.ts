import { Test, TestingModule } from '@nestjs/testing';
import { UrlConfigService } from './url-config.service';

describe('UrlConfigService', () => {
  let service: UrlConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlConfigService],
    }).compile();

    service = module.get<UrlConfigService>(UrlConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
