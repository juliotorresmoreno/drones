import { JoiSchema, getClassSchema } from 'joi-class-decorators';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class UpdateMedicationDto {
  @ApiProperty()
  @JoiSchema(Joi.string())
  readonly name?: string;

  @ApiProperty()
  @JoiSchema(Joi.number().min(0).max(1000))
  readonly weight?: number;

  @ApiProperty()
  @JoiSchema(Joi.string())
  readonly code?: string;

  @ApiProperty()
  @JoiSchema(Joi.string().uri())
  readonly image?: string;
}

export const UpdateMedicationDtoSchema = getClassSchema(UpdateMedicationDto);
