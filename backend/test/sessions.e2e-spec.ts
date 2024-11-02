import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';
import { AppModule } from '../src/app.module';
import { ITab } from '../src/modules/tabs/interface/tab.interface';
import * as request from 'supertest';
import { Types } from 'mongoose';
import { SessionsService } from '../src/modules/sessions/sessions.service';

describe('Sessions Flow (e2e)', () => {
  let app: INestApplication;
  let sessionId: string;
  let userId: Types.ObjectId;
  let sessionService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it.only('should create a new session', async () => {
    const response = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        name: 'Test Session',
        userName: 'Test User',
      });

    const expectedBody = {
      __v: 0,
      _id: expect.any(String),
      name: 'Test Session',
      code: expect.any(String),
      sessionUsers: [],
      creatorId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedBody);

    sessionId = response.body._id;
  });

  afterAll(async () => {
    // socketClient.close();
    await app.close();
  });
});
