import { Test, TestingModule } from '@nestjs/testing';
import { MedicationsService } from './medications.service';
import { MedicationsModule } from './medications.module';

describe('MedicationsService', () => {
  let service: MedicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MedicationsModule],
      providers: [],
    }).compile();

    service = module.get<MedicationsService>(MedicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
