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
export class CreateDroneDto {
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
  @JoiSchema(Joi.number().min(0).max(500).required())
  readonly weight: number;

  @ApiProperty()
  @JoiSchema(Joi.number().min(0).max(100).required())
  readonly battery: number;
}
export const CreateDroneDtoSchema = getClassSchema(CreateDroneDto);