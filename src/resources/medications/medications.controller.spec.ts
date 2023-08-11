import { Test, TestingModule } from '@nestjs/testing';
import { MedicationsController } from './medications.controller';
import { MedicationsService } from './medications.service';
import { MedicationsModule } from './medications.module';

describe('MedicationsController', () => {
  let controller: MedicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MedicationsModule],
      controllers: [MedicationsController],
      providers: [MedicationsService],
    }).compile();

    controller = module.get<MedicationsController>(MedicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
