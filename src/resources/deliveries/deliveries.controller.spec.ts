import { Test, TestingModule } from '@nestjs/testing';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'src/entities/delivery.entity';
import { DronesModule } from '../drones/drones.module';
import { MedicationsModule } from '../medications/medications.module';

describe('DeliveriesController', () => {
  let controller: DeliveriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([Delivery]),
        DronesModule,
        MedicationsModule,
      ],
      controllers: [DeliveriesController],
      providers: [DeliveriesService],
    }).compile();

    controller = module.get<DeliveriesController>(DeliveriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
