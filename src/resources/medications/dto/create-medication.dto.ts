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
  readonly name: string;

  @ApiProperty()
  @JoiSchema(Joi.number().min(0).max(1000).required())
  readonly weight: number;

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  readonly code: string;

  @ApiProperty()
  @JoiSchema(Joi.string().uri().required())
  readonly image: string;
}

export const CreateMedicationDtoSchema = getClassSchema(CreateMedicationDto);
