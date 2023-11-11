import { Test, TestingModule } from '@nestjs/testing';
import { PasswordHelperService } from './password-helper.service';

describe('PasswordHelperService', () => {
  let service: PasswordHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordHelperService],
    }).compile();

    service = module.get<PasswordHelperService>(PasswordHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
