import { Module } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { DeliveriesController } from './deliveries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'src/entities/delivery.entity';
import { DronesModule } from '../drones/drones.module';
import { MedicationsModule } from '../medications/medications.module';

@Module({
  imports: [TypeOrmModule.forFeature([Delivery]), DronesModule, MedicationsModule],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
})
export class DeliveriesModule {}
