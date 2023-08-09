import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Medication } from 'src/entities/medication.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private repository: Repository<Medication>,
  ) {}

  create(createMedicationDto: CreateMedicationDto) {
    return this.repository
      .insert(createMedicationDto)
      .then(({ identifiers }) => this.findOne(+identifiers[0].id));
  }

  findAll(options?: FindManyOptions<Medication>) {
    return this.repository
      .findAndCount(options)
      .then(([data, total]) => ({ data, total }));
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updateMedicationDto: UpdateMedicationDto) {
    return this.repository
      .update(id, updateMedicationDto)
      .then(() => this.findOne(id));
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
