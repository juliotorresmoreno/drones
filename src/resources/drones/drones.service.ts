import { Injectable } from '@nestjs/common';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Drone } from 'src/entities/drone.entity';

@Injectable()
export class DronesService {
  constructor(
    @InjectRepository(Drone)
    private repository: Repository<Drone>,
  ) {}

  create(createDroneDto: CreateDroneDto) {
    return this.repository
      .insert(createDroneDto)
      .then(({ identifiers }) => this.findOne(+identifiers[0].id));
  }

  findAll(options?: FindManyOptions<Drone>) {
    return this.repository.findAndCount(options);
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateDroneDto: UpdateDroneDto) {
    // Todo: do state machine.
    // const record = await this.findOne(id)
    
    return this.repository
      .update(id, updateDroneDto)
      .then(() => this.findOne(id));
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
