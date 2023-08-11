import * as Joi from 'joi';
import {
  JoiSchema,
  JoiSchemaOptions,
  getClassSchema,
} from 'joi-class-decorators';
import { ApiProperty } from '@nestjs/swagger';
import { ModelDrone } from '../../../entities/drone.entity';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UpdateDroneDto {
  @ApiProperty()
  @JoiSchema(Joi.string())
  readonly serial_number: string;

  @ApiProperty()
  @JoiSchema(
    Joi.string().valid(
      'Lightweight',
      'Middleweight',
      'Cruiserweight',
      'Heavyweight',
    ),
  )
  readonly model: ModelDrone;

  @ApiProperty()
  @JoiSchema(Joi.number().min(0).max(1000))
  readonly weight: number;

  @ApiProperty()
  @JoiSchema(Joi.number().min(0).max(100))
  readonly battery: number;
}

export const UpdateDroneDtoSchema = getClassSchema(UpdateDroneDto);
