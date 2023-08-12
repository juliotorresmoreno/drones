import { Test, TestingModule } from '@nestjs/testing';
import { MedicationsService } from './medications.service';
import { Medication } from '../../entities/medication.entity';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('MedicationsService', () => {
  let service: MedicationsService;

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
      providers: [MedicationsService],
    }).compile();

    service = module.get<MedicationsService>(MedicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should crud be working', async () => {
    let medication: Medication;
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
    medication = await service.create(defaultValue);
    expect(medication.id > 0).toBeTruthy();
    expect(medication.name).toBe(defaultValue.name);
    expect(medication.code).toBe(defaultValue.code);
    expect(medication.image).toBe(defaultValue.image);
    expect(medication.weight).toBe(defaultValue.weight);

    medication = await service.findOne(medication.id);
    expect(medication.name).toBe(defaultValue.name);
    expect(medication.code).toBe(defaultValue.code);
    expect(medication.image).toBe(defaultValue.image);
    expect(medication.weight).toBe(defaultValue.weight);

    medication = await service.update(medication.id, updatedValue);
    expect(medication.name).toBe(updatedValue.name);
    expect(medication.code).toBe(updatedValue.code);
    expect(medication.image).toBe(updatedValue.image);
    expect(medication.weight).toBe(updatedValue.weight);

    await service.remove(medication.id);
    medication = await service.findOne(medication.id);
    expect(medication).toBeNull();
  });
});
