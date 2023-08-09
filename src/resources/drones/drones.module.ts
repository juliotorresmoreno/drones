import { Module } from '@nestjs/common';
import { DronesService } from './drones.service';
import { DronesController } from './drones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drone } from 'src/entities/drone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drone])],
  controllers: [DronesController],
  providers: [DronesService],
})
export class DronesModule {}
