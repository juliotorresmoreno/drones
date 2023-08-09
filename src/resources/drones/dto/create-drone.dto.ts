import * as Joi from 'joi';
import {
  JoiSchema,
  JoiSchemaOptions,
  getClassSchema,
} from 'joi-class-decorators';
import { ApiProperty } from '@nestjs/swagger';
import { ModelDrone, StateDrone } from 'src/entities/drone.entity';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateDroneDto {
  @ApiProperty()
  @JoiSchema(Joi.string().required())
  readonly serial_number: string;

  @ApiProperty()
  @JoiSchema(
    Joi.string().valid(
      'Lightweight',
      'Middleweight',
      'Cruiserweight',
      'Heavyweight',
    ).required(),
  )
  readonly model: ModelDrone;

  @ApiProperty()
  @JoiSchema(Joi.number().required())
  readonly weight: number;

  @ApiProperty()
  @JoiSchema(Joi.number().min(0).max(100).required())
  readonly battery: number;

  @ApiProperty()
  @JoiSchema(
    Joi.string()
      .valid(
        'IDLE',
        'LOADING',
        'LOADED',
        'DELIVERING',
        'DELIVERED',
        'RETURNING',
      )
      .required(),
  )
  readonly state: StateDrone;
}
export const CreateDroneDtoSchema = getClassSchema(CreateDroneDto);
