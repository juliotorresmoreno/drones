import { Test, TestingModule } from '@nestjs/testing';
import { DronesController } from './drones.controller';
import { DronesService } from './drones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../config/configuration';
import { Drone } from '../../entities/drone.entity';

describe('DronesController', () => {
  let controller: DronesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
              database: `/tmp/line.sqlite`,
              entities: [__dirname + '/entities/*.entity{.ts,.js}'],
              synchronize: true,
            };
          },
        }),
        TypeOrmModule.forFeature([Drone]),
      ],
      controllers: [DronesController],
      providers: [DronesService],
    }).compile();

    controller = app.get<DronesController>(DronesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
