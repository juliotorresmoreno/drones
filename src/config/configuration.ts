import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().default('Drone'),
  DB_NAME: Joi.string().default(':memory:'),
  DB_DRIVER: Joi.string()
    .valid('postgres', 'mysql', 'oracle', 'mssql', 'sqlite')
    .default('sqlite'),
  DB_SYNC: Joi.string().valid('true', 'false').default('true').optional(),
  ALLOW_ORIGIN: Joi.string().default('*'),
});

type Configuration = {
  port: number;
  appName: string;
};

export default (): Configuration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  appName: process.env.APP_NAME || '',
});
