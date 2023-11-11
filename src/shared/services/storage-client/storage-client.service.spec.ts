import { Test, TestingModule } from '@nestjs/testing';
import { StorageClientService } from './storage-client.service';

describe('StorageClientService', () => {
  let service: StorageClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageClientService],
    }).compile();

    service = module.get<StorageClientService>(StorageClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
