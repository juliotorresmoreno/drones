import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'joi-class-decorators';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class CreateDeliveryDto {
  @ApiProperty()
  @JoiSchema(Joi.number().required())
  drone_id: number;

  @ApiProperty()
  @JoiSchema(Joi.number().required())
  medication_id: number;
}
