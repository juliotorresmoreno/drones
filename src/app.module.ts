import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { DronesModule } from './resources/drones/drones.module';
import { MedicationsModule } from './resources/medications/medications.module';
import { HomeModule } from './resources/home/home.module';
import configuration, { validationSchema } from './config/configuration';
import { DeliveriesModule } from './resources/deliveries/deliveries.module';
import { TasksService } from './services/tasks/tasks.service';
import { Drone } from './entities/drone.entity';
import { Medication } from './entities/medication.entity';
import { Delivery } from './entities/delivery.entity';
import * as fs from 'fs';

const getEnvironmentFile = () => {
  if (process.env.NODE_ENV === 'test') {
    return '.env.test';
  }
  if (process.env.NODE_ENV === 'production') {
    return '.env';
  }
  return '.env.develop';
};

const entities = [Drone, Medication, Delivery];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
      envFilePath: (() => {
        let envFile = getEnvironmentFile();
        Logger.debug('loading ' + envFile + ' file');
        if (!fs.existsSync(envFile)) {
          return [];
        }
        return envFile;
      })(),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: process.env.DB_DRIVER as any,
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities,
          synchronize: process.env.DB_SYNC === 'true',
        };
      },
    }),
    ScheduleModule.forRoot(),
    DronesModule,
    MedicationsModule,
    HomeModule,
    DeliveriesModule,
  ],
  controllers: [],
  providers: [TasksService],
})
export class AppModule {}
