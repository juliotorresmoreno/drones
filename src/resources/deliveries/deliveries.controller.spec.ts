import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { Delivery } from '../../entities/delivery.entity';
import { DronesModule } from '../drones/drones.module';
import { MedicationsModule } from '../medications/medications.module';
import { Drone } from '../../entities/drone.entity';
import { Medication } from '../../entities/medication.entity';
import configuration from '../../config/configuration';

describe('DeliveriesController', () => {
  let controller: DeliveriesController;

  beforeEach(async () => {
    const entities = [Delivery, Drone, Medication];
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
          envFilePath: '.env.development',
        }),
        TypeOrmModule.forRootAsync({
          useFactory: () => {
            return {
              type: 'sqlite',
              database: `:memory:`,
              entities,
              synchronize: true,
            };
          },
        }),
        TypeOrmModule.forFeature(entities),
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
