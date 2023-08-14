import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import {
  FindManyOptions,
  FindOptionsWhere,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { Drone, StateDrone, StatesDrone } from '../../entities/drone.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DronesService {
  constructor(@InjectRepository(Drone) private repository: Repository<Drone>) {}

  create({
    state = StatesDrone.IDLE,
    ...CreateDroneDto
  }: CreateDroneDto & { state?: StateDrone }) {
    return this.repository
      .insert({ ...CreateDroneDto, state })
      .then(({ identifiers }) => this.findOne(+identifiers[0].id))
      .catch((err) => {
        if (err instanceof QueryFailedError) {
          if (err.driverError.toString().indexOf('UNIQUE') > 0) {
            throw new BadRequestException(
              `serial number "${CreateDroneDto.serial_number}" already exists!`,
            );
          }
          throw new BadRequestException();
        }
        throw err;
      });
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

  update(id: number, updateDroneDto: UpdateDroneDto & { state?: StateDrone }) {
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
