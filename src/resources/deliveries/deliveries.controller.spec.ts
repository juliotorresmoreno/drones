import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { Delivery } from '../../entities/delivery.entity';
import { DronesModule } from '../drones/drones.module';
import { MedicationsModule } from '../medications/medications.module';
import { Drone, ModelsDrone, StatesDrone } from '../../entities/drone.entity';
import { Medication } from '../../entities/medication.entity';
import configuration from '../../config/configuration';
import { DronesService } from '../drones/drones.service';
import { MedicationsService } from '../medications/medications.service';

describe('DeliveriesController', () => {
  let controller: DeliveriesController;
  let dronesService: DronesService;
  let medicationsService: MedicationsService;

  let drone;
  let medication;

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
    dronesService = module.get<DronesService>(DronesService);
    medicationsService = module.get<MedicationsService>(MedicationsService);

    drone = await dronesService.create({
      battery: 20,
      model: ModelsDrone.Cruiserweight,
      serial_number: '01234',
      weight: 500,
    });
    medication = await medicationsService.create({
      code: '0000',
      name: 'Example1',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_Drone.jpg',
      weight: 500,
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should crud be success', async () => {
    let delivery: any = await controller.create({
      drone_id: drone.id,
      medication_id: medication.id,
    });
    expect(delivery.id > 0).toBeTruthy();
    expect(delivery.drone_id).toBe(drone.id);
    expect(delivery.medication_id).toBe(medication.id);
    expect(delivery.battery).toBe(20);
    expect(delivery.capacity).toBe(drone.weight);
    expect(delivery.weight).toBe(medication.weight);
    expect(delivery.state).toBe('active');

    delivery = await controller.findOne(delivery.id);
    expect(delivery.drone_id).toBe(drone.id);
    expect(delivery.medication_id).toBe(medication.id);
    expect(delivery.battery).toBe(20);
    expect(delivery.capacity).toBe(drone.weight);
    expect(delivery.weight).toBe(medication.weight);
    expect(delivery.state).toBe('active');

    delivery = await controller.findAll().then((result) => result.data[0]);
    expect(delivery.drone_id).toBe(drone.id);
    expect(delivery.medication_id).toBe(medication.id);
    expect(delivery.battery).toBe(20);
    expect(delivery.capacity).toBe(drone.weight);
    expect(delivery.weight).toBe(medication.weight);
    expect(delivery.state).toBe('active');

    await controller
      .create({
        drone_id: drone.id,
        medication_id: medication.id,
      })
      .catch((err) => {
        expect(err instanceof Error).toBeTruthy();
      });

    delivery = await controller.transition(delivery.id, { event: 'START' });
    expect(delivery.drone.state).toBe(StatesDrone.IDLE);
    delivery = await controller.transition(delivery.id, { event: 'LOADED' });
    expect(delivery.drone.state).toBe(StatesDrone.IDLE);
    expect(delivery.state).toBe('active');

    await controller
      .transition(delivery.id, { event: 'LOADING' })
      .catch((err) => {
        expect(err instanceof Error).toBeTruthy();
      });
    expect(delivery.drone.state).toBe(StatesDrone.IDLE);
    drone = await dronesService.update(drone.id, { battery: 30 });
    delivery = await controller.transition(delivery.id, { event: 'LOADING' });
    expect(delivery.drone.state).toBe(StatesDrone.LOADING);
    expect(delivery.state).toBe('active');

    delivery = await controller.transition(delivery.id, { event: 'FINISHED' });
    expect(delivery.drone.state).toBe(StatesDrone.LOADING);
    delivery = await controller.transition(delivery.id, { event: 'DELIVERED' });
    expect(delivery.drone.state).toBe(StatesDrone.LOADING);
    delivery = await controller.transition(delivery.id, { event: 'LOADED' });
    expect(delivery.drone.state).toBe(StatesDrone.LOADED);
    expect(delivery.state).toBe('active');

    delivery = await controller.transition(delivery.id, { event: 'FINISHED' });
    expect(delivery.drone.state).toBe(StatesDrone.LOADED);
    delivery = await controller.transition(delivery.id, { event: 'DELIVERED' });
    expect(delivery.drone.state).toBe(StatesDrone.LOADED);
    delivery = await controller.transition(delivery.id, {
      event: 'DELIVERING',
    });
    expect(delivery.drone.state).toBe(StatesDrone.DELIVERING);
    expect(delivery.state).toBe('active');

    delivery = await controller.transition(delivery.id, { event: 'FINISHED' });
    expect(delivery.drone.state).toBe(StatesDrone.DELIVERING);
    delivery = await controller.transition(delivery.id, { event: 'FINISHED' });
    expect(delivery.drone.state).toBe(StatesDrone.DELIVERING);
    delivery = await controller.transition(delivery.id, { event: 'DELIVERED' });
    expect(delivery.drone.state).toBe(StatesDrone.DELIVERED);
    expect(delivery.state).toBe('active');

    delivery = await controller.transition(delivery.id, { event: 'FINISHED' });
    expect(delivery.drone.state).toBe(StatesDrone.DELIVERED);
    delivery = await controller.transition(delivery.id, { event: 'FINISHED' });
    expect(delivery.drone.state).toBe(StatesDrone.DELIVERED);
    delivery = await controller.transition(delivery.id, { event: 'RETURNING' });
    expect(delivery.drone.state).toBe(StatesDrone.RETURNING);
    expect(delivery.state).toBe('active');

    delivery = await controller.transition(delivery.id, { event: 'FINISHED' });
    expect(delivery.drone.state).toBe(StatesDrone.IDLE);
    expect(delivery.state).toBe('finished');

    delivery = await controller.create({
      drone_id: drone.id,
      medication_id: medication.id,
    });
    expect(delivery.id > 0).toBeTruthy();

    await controller.remove(delivery.id);
    await controller.findOne(delivery.id).catch((err) => {
      expect(err instanceof Error).toBeTruthy();
    });
  });
});
