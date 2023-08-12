import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { DronesService } from '../../resources/drones/drones.service';
import configuration from '../../config/configuration';
import { Drone, ModelsDrone, StatesDrone } from '../../entities/drone.entity';

describe('TasksService', () => {
  let service: TasksService;
  let dronesService: DronesService;

  beforeEach(async () => {
    const entities = [Drone];
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
      providers: [TasksService, DronesService],
    }).compile();

    service = module.get<TasksService>(TasksService);
    dronesService = module.get<DronesService>(DronesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fix 1 record', async () => {
    let drone = await dronesService.create({
      battery: 24,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 200,
      state: StatesDrone.LOADING,
    });
    expect(drone.state).toBe(StatesDrone.LOADING);
    await service.handleCron();
    drone = await dronesService.findOne(drone.id);
    expect(drone.state).toBe(StatesDrone.IDLE);
  });

  it('should be ok', async () => {
    let drone = await dronesService.create({
      battery: 26,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 200,
      state: StatesDrone.LOADING,
    });
    expect(drone.state).toBe(StatesDrone.LOADING);
    await service.handleCron();
    drone = await dronesService.findOne(drone.id);
    expect(drone.state).toBe(StatesDrone.LOADING);
  });
});
