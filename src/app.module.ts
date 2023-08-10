import { Module } from '@nestjs/common';
import { DronesModule } from './resources/drones/drones.module';
import { MedicationsModule } from './resources/medications/medications.module';
import { HomeModule } from './resources/home/home.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration, { validationSchema } from './config/configuration';
import { DeliveriesModule } from './resources/deliveries/deliveries.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema,
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
          entities: [__dirname + '/entities/*.entity{.ts,.js}'],
          synchronize: process.env.DB_SYNC === 'true',
        };
      },
    }),
    DronesModule,
    MedicationsModule,
    HomeModule,
    DeliveriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
