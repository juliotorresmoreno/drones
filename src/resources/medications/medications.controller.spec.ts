import { Test, TestingModule } from '@nestjs/testing';
import { MedicationsController } from './medications.controller';
import { MedicationsService } from './medications.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medication } from '../../entities/medication.entity';

describe('MedicationsController', () => {
  let controller: MedicationsController;

  beforeEach(async () => {
    const entities = [Medication];
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
      ],
      controllers: [MedicationsController],
      providers: [MedicationsService],
    }).compile();

    controller = module.get<MedicationsController>(MedicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should crud be success', async () => {
    let medication;
    const defaultValue = {
      code: '0000',
      name: 'Example1',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_Drone.jpg',
      weight: 500,
    };
    const updatedValue = {
      code: '0001',
      name: 'Example2',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/5/56/DJI_Phantom_1_1530564a.jpg',
      weight: 501,
    };

    medication = await controller.create(defaultValue);
    expect(medication.id > 0).toBeTruthy();
    expect(medication.name).toBe(defaultValue.name);
    expect(medication.code).toBe(defaultValue.code);
    expect(medication.image).toBe(defaultValue.image);
    expect(medication.weight).toBe(defaultValue.weight);

    medication = await controller.findOne(medication.id);
    expect(medication.name).toBe(defaultValue.name);
    expect(medication.code).toBe(defaultValue.code);
    expect(medication.image).toBe(defaultValue.image);
    expect(medication.weight).toBe(defaultValue.weight);

    medication = await controller.update(medication.id, updatedValue);
    expect(medication.name).toBe(updatedValue.name);
    expect(medication.code).toBe(updatedValue.code);
    expect(medication.image).toBe(updatedValue.image);
    expect(medication.weight).toBe(updatedValue.weight);

    await controller.remove(medication.id);
    medication = await controller.findOne(medication.id);
    expect(medication).toBeNull();
  });
});
