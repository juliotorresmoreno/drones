import { Injectable } from '@nestjs/common';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Drone } from 'src/entities/drone.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

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
    return this.repository
      .findAndCount(options)
      .then(([data, total]) => ({ data, total }));
  }

  count(options?: FindManyOptions<Drone>) {
    return this.repository.count(options);
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updateDroneDto: UpdateDroneDto) {
    return this.repository
      .update(id, updateDroneDto)
      .then(() => this.findOne(id));
  }

  async updateAll(
    options: FindOptionsWhere<Drone>,
    data: QueryDeepPartialEntity<Drone>,
  ) {
    await this.repository.update(options, data);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
