import { e2eUsers } from './seeds/user-seeds.e2e';
import { TestApp } from './utils/test-app';
import * as request from 'supertest';

describe('Feature: getting a user by its ID', () => {
  let app: TestApp;

  beforeEach(async () => {
    app = new TestApp();
    await app.setup();
    await app.loadFixtures([e2eUsers.alice]);
  });

  afterEach(async () => {
    await app.cleanup();
  });

  describe('Scenario: Happy path', () => {
    it('should succeed', async () => {
      const id = e2eUsers.alice.entity.props.id;
      const result = await request(app.getHttpServer()).get(`/users/${id}`);

      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        id: 'alice-id',
        email: 'alice@gmail.com',
      });
    });
  });
});
