import { Test, TestingModule } from '@nestjs/testing';
import { DronesService } from './drones.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drone, ModelsDrone, StatesDrone } from '../../entities/drone.entity';

describe('DronesService', () => {
  let service: DronesService;

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
      providers: [DronesService],
    }).compile();

    service = module.get<DronesService>(DronesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should crud be working', async () => {
    let drone: Drone;
    drone = await service.create({
      battery: 20,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 500,
    });
    expect(drone.id > 0).toBeTruthy();
    expect(drone.battery).toBe(20);
    expect(drone.model).toBe(ModelsDrone.Cruiserweight);
    expect(drone.state).toBe(StatesDrone.IDLE);
    expect(drone.weight).toBe(500);
    expect(drone.serial_number).toBe('01234');

    drone = await service.findOne(drone.id);
    expect(drone.battery).toBe(20);
    expect(drone.model).toBe(ModelsDrone.Cruiserweight);
    expect(drone.state).toBe(StatesDrone.IDLE);
    expect(drone.weight).toBe(500);
    expect(drone.serial_number).toBe('01234');

    drone = await service.update(drone.id, {
      battery: 50,
      model: ModelsDrone.Heavyweight,
      serial_number: '07894',
      weight: 400,
    });
    expect(drone.battery).toBe(50);
    expect(drone.model).toBe(ModelsDrone.Heavyweight);
    expect(drone.weight).toBe(400);
    expect(drone.serial_number).toBe('07894');

    await service.remove(drone.id);
    drone = await service.findOne(drone.id);
    expect(drone).toBeNull();
  });
});
