import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { DronesService } from '../../resources/drones/drones.service';
import configuration from '../../config/configuration';
import { Drone } from '../../entities/drone.entity';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const entities = [Drone];
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
          envFilePath: '.env.development',
        }),
        TypeOrmModule.forRootAsync({
          useFactory: () => {
            return {
              type: 'sqlite',
              database: `:memory:`,
              entities,
              synchronize: true,
            };
          },
        }),
        TypeOrmModule.forFeature(entities),
      ],
      providers: [TasksService, DronesService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
