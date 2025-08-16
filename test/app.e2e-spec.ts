import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/app/create (POST)', async () => {
    const req = await request(app.getHttpServer())
      .post('/app/create')
      .send({ num: 1 });
    expect(req.body.num).toBe(1);
    expect(req.body.id).toBeGreaterThan(0);
    expect(req.statusCode).toBe(201);
  });
});
