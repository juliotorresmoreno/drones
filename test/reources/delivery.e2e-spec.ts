import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as Joi from 'joi';
import { AppModule } from './../../src/app.module';
import { ModelsDrone } from '../../src/entities/drone.entity';

describe('DeliveriesController (e2e)', () => {
  let app: INestApplication;
  let drone, medication, delivery;

  const deliverySchema = Joi.object({
    id: Joi.number().required(),
    drone_id: Joi.number().required(),
    medication_id: Joi.number().required(),
    capacity: Joi.number().required(),
    weight: Joi.number().required(),
    battery: Joi.number().required(),
    state: Joi.valid('active', 'finished').required(),
    drone: Joi.any(),
    medication: Joi.any(),
    created_at: Joi.any(),
    updated_at: Joi.any(),
    deleted_at: Joi.any(),
  });
  const deliveriesSchema = Joi.object({
    total: Joi.number().required(),
    data: Joi.array().items(deliverySchema),
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
        battery: 30,
        model: ModelsDrone.Cruiserweight,
        serial_number: '01234',
        weight: 500,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect(function (res) {
        drone = res.body;
      });

    await request(app.getHttpServer())
      .post('/medications')
      .send({
        code: '0000',
        name: 'Example1',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_medication.jpg',
        weight: 500,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect((res) => {
        medication = res.body;
      });

    await request(app.getHttpServer())
      .post('/deliveries')
      .send({
        drone_id: drone.id,
        medication_id: medication.id,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect((res) => {
        delivery = res.body;
        const { error } = deliverySchema.validate(delivery);
        expect(error).toBeUndefined();
      });
  });

  it('/deliveries (GET)', async () => {
    return request(app.getHttpServer())
      .get('/deliveries')
      .expect(200)
      .expect((res) => {
        const body = res.body;
        const { error } = deliveriesSchema.validate(body);
        expect(error).toBeUndefined();
      });
  });

  it('/deliveries/{id} (GET)', async () => {
    return request(app.getHttpServer())
      .get('/deliveries/' + medication.id)
      .expect(200)
      .expect(function (res) {
        delivery = res.body;
        const { error } = deliverySchema.validate(delivery);
        expect(error).toBeUndefined();
      });
  });

  it('/deliveries (POST)', async () => {
    const { error } = deliverySchema.validate(delivery);
    expect(error).toBeUndefined();
  });

  it('/deliveries (POST)', async () => {
    await request(app.getHttpServer())
      .post('/deliveries')
      .send({
        drone_id: drone.id,
        medication_id: 999,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/deliveries (POST)', async () => {
    await request(app.getHttpServer())
      .post('/deliveries')
      .send({
        drone_id: 999,
        medication_id: medication.id,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/deliveries (DELETE)', async () => {
    await request(app.getHttpServer())
      .del('/deliveries/' + delivery.id)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/deliveries/{id}/transition (PATCH)', async () => {
    const states = [
      'LOADING',
      'LOADED',
      'DELIVERING',
      'DELIVERED',
      'RETURNING',
    ];

    for (let state of states) {
      await request(app.getHttpServer())
        .patch('/deliveries/' + delivery.id + '/transition')
        .send({
          event: state,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res) {
          delivery = res.body;
          const { error } = deliverySchema.validate(delivery);
          expect(error).toBeUndefined();
          expect(delivery.drone.state).toBe(state);
        });
    }

    await request(app.getHttpServer())
      .post('/deliveries')
      .send({
        drone_id: drone.id,
        medication_id: medication.id,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    await request(app.getHttpServer())
      .patch('/deliveries/' + delivery.id + '/transition')
      .send({
        event: 'FINISHED',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        delivery = res.body;
        const { error } = deliverySchema.validate(delivery);
        expect(error).toBeUndefined();
        expect(delivery.drone.state).toBe('IDLE');
      });
  });

  it('/deliveries (DELETE)', async () => {
    await request(app.getHttpServer())
      .del('/deliveries/' + 999)
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
