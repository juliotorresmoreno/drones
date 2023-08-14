import * as Joi from 'joi';
import { JoiSchema } from 'joi-class-decorators';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty()
  @JoiSchema(Joi.number().required())
  readonly statusCode: number;

  @ApiProperty()
  @JoiSchema(Joi.string().required())
  readonly message: string;
}

export class SuccessResponse {
  @ApiProperty()
  @JoiSchema(Joi.boolean().required())
  readonly success: boolean;
}
