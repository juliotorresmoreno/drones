import { JoiSchema, getClassSchema } from 'joi-class-decorators';
import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class UpdateMedicationDto {
  @ApiProperty()
  @JoiSchema(Joi.string())
  name?: string;

  @ApiProperty()
  @JoiSchema(Joi.number())
  weight?: number;

  @ApiProperty()
  @JoiSchema(Joi.string())
  code?: string;

  @ApiProperty()
  @JoiSchema(Joi.string().uri())
  image?: string;
}

export const UpdateMedicationDtoSchema = getClassSchema(UpdateMedicationDto);
