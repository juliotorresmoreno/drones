import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';
import * as Joi from 'joi';

describe('MedicationsController (e2e)', () => {
  let app: INestApplication;
  let medication;

  const medicationSchema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    weight: Joi.number().min(0).max(1000).required(),
    code: Joi.string().required(),
    image: Joi.string().uri().required(),
    created_at: Joi.any(),
    updated_at: Joi.any(),
    deleted_at: Joi.any(),
  });
  const medicationsSchema = Joi.object({
    total: Joi.number().required(),
    data: Joi.array().items(medicationSchema),
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

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
        const { error } = medicationSchema.validate(medication);
        expect(error).toBeUndefined();
      });
  });

  it('/medications (GET)', async () => {
    return request(app.getHttpServer())
      .get('/medications')
      .expect(200)
      .expect((res) => {
        const body = res.body;
        const { error } = medicationsSchema.validate(body);
        expect(error).toBeUndefined();
      });
  });

  it('/medications/{id} (GET)', async () => {
    return request(app.getHttpServer())
      .get('/medications/' + medication.id)
      .expect(200)
      .expect(function (res) {
        medication = res.body;
        const { error } = medicationSchema.validate(medication);
        expect(error).toBeUndefined();
      });
  });

  it('/medications (POST)', async () => {
    const { error } = medicationSchema.validate(medication);
    expect(error).toBeUndefined();
  });

  it('/medications (POST) -> invalid', async () => {
    await request(app.getHttpServer())
      .post('/medications')
      .send({
        name: 'Example1',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_medication.jpg',
        weight: 500,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/medications (POST) -> invalid', async () => {
    await request(app.getHttpServer())
      .post('/medications')
      .send({
        code: '0000',
        name: 'Example1',
        weight: 500,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/medications (POST) -> invalid', async () => {
    await request(app.getHttpServer())
      .post('/medications')
      .send({
        code: '0000',
        name: 'Example1',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_medication.jpg',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/medications (POST) -> invalid', async () => {
    await request(app.getHttpServer())
      .post('/medications')
      .send({
        code: '0000',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_medication.jpg',
        weight: 500,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/medications (POST) -> invalid', async () => {
    await request(app.getHttpServer())
      .post('/medications')
      .send({
        code: '0000',
        name: 'Example1',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_medication.jpg',
        weight: -1,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/medications (POST) -> invalid', async () => {
    await request(app.getHttpServer())
      .post('/medications')
      .send({
        code: '0000',
        name: 'Example1',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/a/af/WMCH_medication.jpg',
        weight: 1001,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/medications/{id} (PATCH)', async () => {
    await request(app.getHttpServer())
      .patch('/medications/' + medication.id)
      .send({
        code: '0001',
        name: 'Example2',
        weight: 300,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        medication = res.body;
        const { error } = medicationSchema.validate(medication);
        expect(error).toBeUndefined();
      });
  });

  it('/medications/{id} (PATCH) -> invalid', async () => {
    await request(app.getHttpServer())
      .patch('/medications/' + medication.id)
      .send({
        weight: -1,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/medications/{id} (PATCH) -> invalid', async () => {
    await request(app.getHttpServer())
      .patch('/medications/' + medication.id)
      .send({
        weight: 1001,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('/medications/{id} (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete('/medications/' + medication.id)
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/medications/{id} (DELETE) - invalid', async () => {
    return request(app.getHttpServer())
      .delete('/medications/' + 999)
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
