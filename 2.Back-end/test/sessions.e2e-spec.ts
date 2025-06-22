import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { SessionsService } from 'src/modules/sessions/sessions.service';
import { UserService } from 'src/modules/users/user.service';
import { CleanupUtility } from './utility/cleanup.utility';

describe('Sessions Flow (e2e)', () => {
  let app: INestApplication;
  let sessionsService: SessionsService;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();
    sessionsService = moduleRef.get<SessionsService>(SessionsService);
    userService = moduleRef.get<UserService>(UserService);

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it('should create a new session', async () => {
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
    CleanupUtility.trackSessionId(response.body._id);
    CleanupUtility.trackUserId(response.body.creatorId);
  });

  it('should create a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Test User' });

    const expectedBody = {
      __v: 0,
      _id: expect.any(String),
      name: 'Test User',
    };
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedBody);
  });

  it('should create session with existing user as creator', async () => {
    const responseUser = await request(app.getHttpServer())
      .post('/users')
      .send({ name: 'Test User' });

    const response = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        name: 'Test Session',
        creatorId: responseUser.body._id,
      });

    const expectedBody = {
      __v: 0,
      _id: expect.any(String),
      name: 'Test Session',
      code: expect.any(String),
      creatorId: responseUser.body._id,
      sessionUsers: [],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedBody);
    CleanupUtility.trackSessionId(response.body._id);
    CleanupUtility.trackUserId(responseUser.body._id);
  });

  it('should create a session, add user to session, and remove user from session', async () => {

  });

  afterAll(async () => {
    await app.close();
    await CleanupUtility.cleanup(sessionsService, userService);
  });
});
