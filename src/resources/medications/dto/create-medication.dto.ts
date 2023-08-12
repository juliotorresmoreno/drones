import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import {
  JoiSchema,
  JoiSchemaOptions,
  getClassSchema,
} from 'joi-class-decorators';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateMedicationDto {
  @ApiProperty()
  @JoiSchema(Joi.string().required())
  name: string;

  @ApiProperty()
  @JoiSchema(Joi.number().min(0).max(1000).required())
  weight: number;

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  code: string;

  @ApiProperty()
  @JoiSchema(Joi.string().uri().required())
  image: string;
}

export const CreateMedicationDtoSchema = getClassSchema(CreateMedicationDto);
