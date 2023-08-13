import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as Joi from 'joi';
import { AppModule } from './../../src/app.module';
import { ModelsDrone } from './../../src/entities/drone.entity';

describe('DronesController (e2e)', () => {
  let app: INestApplication;
  let drone;

  const droneSchema = Joi.object({
    id: Joi.number().required(),
    serial_number: Joi.string().required(),
    model: Joi.string()
      .valid('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight')
      .required(),
    weight: Joi.number().min(0).max(1000).required(),
    battery: Joi.number().min(0).max(100).required(),
    state: Joi.string()
      .valid(
        'IDLE',
        'LOADING',
        'LOADED',
        'DELIVERING',
        'DELIVERED',
        'RETURNING',
      )
      .required(),
    created_at: Joi.any(),
    updated_at: Joi.any(),
    deleted_at: Joi.any(),
  });
  const dronesSchema = Joi.object({
    total: Joi.number().required(),
    data: Joi.array().items(droneSchema),
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer())
      .post('/drones')
      .send({
        battery: 20,
        model: ModelsDrone.Cruiserweight,
        serial_number: '01234',
        weight: 500,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect(function (res) {
        drone = res.body;
        const { error } = droneSchema.validate(drone);
        expect(error).toBeUndefined();
      });
  });

  it('/drones (GET)', async () => {
    return request(app.getHttpServer())
      .get('/drones')
      .expect(200)
      .expect((res) => {
        const body = res.body;
        const { error } = dronesSchema.validate(body);
        expect(error).toBeUndefined();
      });
  });

  it('/drones/{id} (GET)', async () => {
    return request(app.getHttpServer())
      .get('/drones/' + drone.id)
      .expect(200)
      .expect(function (res) {
        drone = res.body;
        const { error } = droneSchema.validate(drone);
        expect(error).toBeUndefined();
      });
  });

  it('/drones (POST)', async () => {
    const { error } = droneSchema.validate(drone);
    expect(error).toBeUndefined();
  });

  it('/drones (POST) -> invalid', async () => {
    return request(app.getHttpServer())
      .post('/drones')
      .send({
        battery: 200,
        model: ModelsDrone.Cruiserweight,
        serial_number: '01234',
        weight: 5000,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/drones (POST) -> invalid', async () => {
    return request(app.getHttpServer())
      .post('/drones')
      .send({
        battery: 20,
        serial_number: '01234',
        weight: 500,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/drones (POST) -> invalid', async () => {
    return request(app.getHttpServer())
      .post('/drones')
      .send({
        model: ModelsDrone.Cruiserweight,
        serial_number: '01234',
        weight: 500,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/drones (POST) -> invalid', async () => {
    return request(app.getHttpServer())
      .post('/drones')
      .send({
        battery: 200,
        model: ModelsDrone.Cruiserweight,
        weight: 5000,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/drones (POST) -> invalid', async () => {
    return request(app.getHttpServer())
      .post('/drones')
      .send({
        battery: 200,
        model: ModelsDrone.Cruiserweight,
        serial_number: '01234',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/drones/{id} (PATCH)', async () => {
    await request(app.getHttpServer())
      .patch('/drones/' + drone.id)
      .send({
        battery: 30,
        model: ModelsDrone.Cruiserweight,
        serial_number: '01234',
        weight: 500,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        drone = res.body;
        const { error } = droneSchema.validate(drone);
        expect(error).toBeUndefined();
      });
  });

  it('/drones/{id} (PATCH) -> invalid', async () => {
    await request(app.getHttpServer())
      .patch('/drones/' + drone.id)
      .send({
        battery: 101,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/drones/{id} (PATCH) -> invalid', async () => {
    await request(app.getHttpServer())
      .patch('/drones/' + drone.id)
      .send({
        battery: -1,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/drones/{id} (PATCH) -> invalid', async () => {
    await request(app.getHttpServer())
      .patch('/drones/' + drone.id)
      .send({
        weight: -1,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/drones/{id} (PATCH) -> invalid', async () => {
    await request(app.getHttpServer())
      .patch('/drones/' + drone.id)
      .send({
        weight: 1001,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/drones/{id} (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete('/drones/' + drone.id)
      .expect(200);
  });

  it('/drones/{id} (DELETE) - invalid', async () => {
    return request(app.getHttpServer())
      .delete('/drones/' + 999)
      .expect(200);
  });
});
