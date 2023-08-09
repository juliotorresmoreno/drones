import * as Joi from 'joi';
import { JoiValidationPipe } from './joiValidation.pipe';

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(new JoiValidationPipe(Joi.object({}))).toBeDefined();
  });
});
