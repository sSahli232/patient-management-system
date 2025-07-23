import { e2ePatients } from './seeds/patient-seeds.e2e';
import { e2eUsers } from './seeds/user-seeds.e2e';
import { TestApp } from './utils/test-app';
import * as request from 'supertest';

describe('Feature: getting all patients', () => {
  let app: TestApp;

  beforeEach(async () => {
    app = new TestApp();
    await app.setup();
    await app.loadFixtures([
      e2eUsers.alice,
      e2ePatients.johnDoe,
      e2ePatients.janetDoe,
    ]);
  });

  afterEach(async () => {
    await app.cleanup();
  });

  describe('Scenario: Happy path', () => {
    it('should succeed', async () => {
      const result = await request(app.getHttpServer())
        .get(`/patients`)
        .set(
          'Authorization',
          await e2eUsers.alice.createAuthorizationToken(app),
        );
      expect(result.status).toBe(200);
      expect(result.body).toEqual([
        {
          id: 'patient-id-1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@mail.com',
          phoneNumber: '1234567890',
          dateOfBirth: '1990-01-01T00:00:00.000Z',
        },
        {
          id: 'patient-id-2',
          firstName: 'Janet',
          lastName: 'Doe',
          email: 'janetdoe@mail.com',
          phoneNumber: '4635567890',
          dateOfBirth: '1995-01-01T00:00:00.000Z',
        },
      ]);
    });
  });

  describe('Scenario: the user is not authenticated', () => {
    it('should reject', async () => {
      const result = await request(app.getHttpServer())
        .get(`/patients`)
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
