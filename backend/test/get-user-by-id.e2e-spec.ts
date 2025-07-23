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
      const result = await request(app.getHttpServer())
        .get(`/users/${id}`)
        .set(
          'Authorization',
          await e2eUsers.alice.createAuthorizationToken(app),
        );
      expect(result.status).toBe(200);
      expect(result.body).toEqual({
        id: 'alice-id',
        email: 'alice@gmail.com',
      });
    });
  });

  describe('Scenario: the user is not authenticated', () => {
    it('should reject', async () => {
      const id = e2eUsers.alice.entity.props.id;

      const result = await request(app.getHttpServer())
        .get(`/users/${id}`)
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          phoneNumber: '+33102030405',
          dateOfBirth: new Date('1980-03-01T00:00:00.000Z'),
        });

      expect(result.status).toBe(401);
    });
  });
});
