import * as request from 'supertest';
import { TestApp } from './utils/test-app';
import {
  I_USER_REPOSITORY,
  IUserRepository,
} from '../src/users/ports/user-repository.interface';

describe('Feature: creating a patient', () => {
  let app: TestApp;

  beforeEach(async () => {
    app = new TestApp();
    await app.setup();
  });

  afterEach(async () => {
    await app.cleanup();
  });

  describe('Scenario: Happy path', () => {
    it('should create a user', async () => {
      const result = await request(app.getHttpServer()).post('/users').send({
        email: 'johndoe@gmail.com',
        password: 'azerty1234',
      });

      expect(result.status).toBe(201);
      expect(result.body).toEqual({
        id: expect.any(String),
      });

      const userRepository = app.get<IUserRepository>(I_USER_REPOSITORY);
      const user = await userRepository.findById(result.body.id);

      expect(user).toBeDefined();
      expect(user?.props).toEqual({
        id: result.body.id,
        email: 'johndoe@gmail.com',
        password: expect.any(String),
      });
    });
  });
});
