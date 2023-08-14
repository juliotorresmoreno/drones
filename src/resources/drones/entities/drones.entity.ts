import * as Joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';
import { ApiProperty } from '@nestjs/swagger';
import { ModelDrone } from 'src/entities/drone.entity';

export class DroneEntity {
  @ApiProperty()
  @JoiSchema(Joi.number().required())
  readonly id: number;

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  readonly serial_number: string;

  @ApiProperty({
    enum: ['Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight'],
  })
  @JoiSchema(
    Joi.string()
      .valid('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight')
      .required(),
  )
  readonly model: ModelDrone;

  @ApiProperty()
  @JoiSchema(Joi.number().min(0).max(1000).required())
  readonly weight: number;

  @ApiProperty()
  @JoiSchema(Joi.number().min(0).max(100).required())
  readonly battery: number;

  @ApiProperty()
  @JoiSchema(Joi.any().required())
  readonly created_at: string;

  @ApiProperty()
  @JoiSchema(Joi.any().required())
  readonly updated_at: string;

  @ApiProperty()
  @JoiSchema(Joi.any().required())
  readonly deleted_at: string;
}

export class DronesEntity {
  @ApiProperty()
  @JoiSchema(Joi.number().required())
  readonly total: number;

  @ApiProperty({
    isArray: true,
    type: DroneEntity,
  })
  readonly data: Array<DroneEntity>;
}
