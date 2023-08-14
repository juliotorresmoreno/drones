import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from 'joi-class-decorators';

@JoiSchemaOptions({
  allowUnknown: false,
})
export class MedicationEntity {
  @ApiProperty()
  @JoiSchema(Joi.number().required())
  readonly id: number;

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

export class MedicationsEntity {
  @ApiProperty()
  @JoiSchema(Joi.number().required())
  readonly total: number;

  @ApiProperty({
    isArray: true,
    type: MedicationEntity,
  })
  readonly data: Array<MedicationEntity>;
}
