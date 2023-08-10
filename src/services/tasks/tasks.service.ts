import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StatesDrone } from 'src/entities/drone.entity';
import { DronesService } from 'src/resources/drones/drones.service';
import { LessThan } from 'typeorm';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private dronesService: DronesService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    try {
      const query = {
        battery: LessThan(25),
        state: StatesDrone.LOADING,
      };
      const drones = await this.dronesService.count({ where: query });
      if (drones) {
        await this.dronesService.updateAll(query, {
          state: StatesDrone.IDLE,
        });
        this.logger.debug(`Update ${drones} drones`);
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
