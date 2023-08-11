import { BadRequestException, Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from '../../entities/delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { DronesService } from '../drones/drones.service';
import { MedicationsService } from '../medications/medications.service';
import { StateMachine } from './deliveries.stateMachine';
import { StatesDrone } from '../../entities/drone.entity';

@Injectable()
export class DeliveriesService {
  private readonly stateMachine: StateMachine = new StateMachine();

  constructor(
    @InjectRepository(Delivery)
    private repository: Repository<Delivery>,
    private droneService: DronesService,
    private medicationService: MedicationsService,
  ) {}

  async create({ drone_id, medication_id }: CreateDeliveryDto) {
    const exists = await this.repository.findOne({
      where: {
        drone_id: drone_id,
        medication_id: medication_id,
        state: 'active',
      },
    });
    if (exists) {
      throw new BadRequestException('The drone is busy!');
    }

    const drone = await this.droneService.findOne(drone_id);
    const medication = await this.medicationService.findOne(medication_id);
    if (!drone) {
      throw new BadRequestException('The drone does not exists!');
    }
    if (!medication) {
      throw new BadRequestException('The medication does not exists!');
    }

    const record = new Delivery();
    record.drone_id = drone_id;
    record.medication_id = medication_id;
    record.weight = medication.weight;
    record.battery = drone.battery;
    record.capacity = drone.weight;
    record.state = 'active';

    return this.repository
      .insert(record)
      .then(({ identifiers }) => this.findOne(+identifiers[0].id));
  }

  findAll(options: FindManyOptions<Delivery> = {}) {
    return this.repository
      .findAndCount({
        ...options,
        cache: true,
        loadEagerRelations: true,
        relations: ['drone', 'medication'],
      })
      .then(([data, total]) => ({ data, total }));
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      cache: false,
      loadEagerRelations: true,
      relations: ['drone', 'medication'],
    });
  }

  async transition(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    const delivery = await this.findOne(id);
    if (!delivery) {
      throw new BadRequestException('The delivery does not exists!');
    }
    if (delivery.state === 'finished') {
      throw new BadRequestException('The delivery is not availed!');
    }
    const drone = await this.droneService.findOne(delivery.drone_id);
    const medication = await this.medicationService.findOne(
      delivery.medication_id,
    );

    try {
      this.stateMachine.transition(updateDeliveryDto.event, drone, medication);
    } finally {
      drone.state = this.stateMachine.currentState;
      await this.droneService.update(drone.id, drone);
      if (updateDeliveryDto.event === 'FINISHED' && drone.state === StatesDrone.IDLE) {
        await this.repository.save({ id: delivery.id, state: 'finished' });
      }
    }

    return this.findOne(id);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
