import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'joi-class-decorators';
import { DroneEntity } from '../../drones/entities/drones.entity';
import { MedicationEntity } from '../../medications/entities/medication.entity';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class DeliveryEntity {
  @ApiProperty()
  @JoiSchema(Joi.number().required())
  readonly drone_id: number;

  @ApiProperty({ type: DroneEntity })
  @JoiSchema(Joi.any().required())
  readonly drone: DroneEntity;

  @ApiProperty()
  @JoiSchema(Joi.number().required())
  readonly medication_id: number;

  @ApiProperty({ type: MedicationEntity })
  @JoiSchema(Joi.any().required())
  readonly medication: MedicationEntity;

  @ApiProperty()
  @JoiSchema(Joi.number().min(0).max(1000).required())
  readonly capacity: number;

  @ApiProperty()
  @JoiSchema(Joi.number().min(0).max(1000).required())
  readonly weight: number;

  @ApiProperty()
  @JoiSchema(Joi.number().min(0).max(100).required())
  readonly battery: number;

  @ApiProperty({
    enum: ['active', 'finished'],
  })
  @JoiSchema(
    Joi.string()
      .valid('active', 'finished')
      .required(),
  )
  readonly state: string;

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

export class DeliverysEntity {
  @ApiProperty()
  @JoiSchema(Joi.number().required())
  readonly total: number;

  @ApiProperty({
    isArray: true,
    type: DeliveryEntity,
  })
  readonly data: Array<DeliveryEntity>;
}
