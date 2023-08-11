import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';
import configuration from '../../config/configuration';
import { Drone, ModelsDrone, StatesDrone } from '../../entities/drone.entity';

describe('DronesController', () => {
  let controller: DronesController;

  beforeEach(async () => {
    const entities = [Drone];
    const app: TestingModule = await Test.createTestingModule({
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
      controllers: [DronesController],
      providers: [DronesService],
    }).compile();

    controller = app.get<DronesController>(DronesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should crud be success', async () => {
    let drone;
    drone = await controller.create({
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

    drone = await controller.findOne(drone.id);
    expect(drone.battery).toBe(20);
    expect(drone.model).toBe(ModelsDrone.Cruiserweight);
    expect(drone.state).toBe(StatesDrone.IDLE);
    expect(drone.weight).toBe(500);
    expect(drone.serial_number).toBe('01234');

    drone = await controller.update(drone.id, {
      battery: 50,
      model: ModelsDrone.Heavyweight,
      serial_number: '07894',
      weight: 400,
    });
    expect(drone.battery).toBe(50);
    expect(drone.model).toBe(ModelsDrone.Heavyweight);
    expect(drone.weight).toBe(400);
    expect(drone.serial_number).toBe('07894');

    await controller.remove(drone.id);
    drone = await controller.findOne(drone.id);
    expect(drone).toBeNull();
  });
});
