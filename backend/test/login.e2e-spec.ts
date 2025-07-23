import * as request from 'supertest';
import { TestApp } from './utils/test-app';
import { e2eUsers } from './seeds/user-seeds.e2e';

describe('Feature: login', () => {
  let app: TestApp;

  beforeEach(async () => {
    app = new TestApp();
    await app.setup();
    await app.loadFixtures([e2eUsers.aliceWithHashedPassword]);
  });

  afterEach(async () => {
    await app.cleanup();
  });

  describe('Scenario: Happy path', () => {
    it('should log the user', async () => {
      const result = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'alice@gmail.com',
          password: 'azerty',
        });

      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        accessToken: expect.any(String),
      });
    });
  });
});
