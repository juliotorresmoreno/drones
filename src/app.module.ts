import { Module } from '@nestjs/common';
import { DronesModule } from './resources/drones/drones.module';
import { MedicationsModule } from './resources/medications/medications.module';
import { TravelsModule } from './resources/travels/travels.module';

@Module({
  imports: [DronesModule, MedicationsModule, TravelsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
