import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import {
  JoiSchema,
  JoiSchemaOptions,
  getClassSchema,
} from 'joi-class-decorators';
import { Event } from '../deliveries.stateMachine';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class UpdateDeliveryDto {
  @ApiProperty()
  @JoiSchema(
    Joi.string()
      .valid(
        'START',
        'LOADING',
        'LOADED',
        'DELIVERING',
        'DELIVERED',
        'RETURNING',
        'FINISHED',
      )
      .required(),
  )
  event: Event;
}

export const UpdateDeliveryDtoSchema = getClassSchema(UpdateDeliveryDto);
