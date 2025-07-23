import * as request from 'supertest';
import { TestApp } from './utils/test-app';
import {
  I_PATIENT_REPOSITORY,
  IPatientRepository,
} from '../src/patients/ports/patient-repository.interface';
import { e2eUsers } from './seeds/user-seeds.e2e';

describe('Feature: creating a patient', () => {
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
    it('should create a patient', async () => {
      const result = await request(app.getHttpServer())
        .post('/patients')
        .set(
          'Authorization',
          await e2eUsers.alice.createAuthorizationToken(app),
        )
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@gmail.com',
          phoneNumber: '+33102030405',
          dateOfBirth: new Date('1980-03-01T00:00:00.000Z'),
        });

      expect(result.status).toBe(201);
      expect(result.body).toEqual({
        id: expect.any(String),
      });

      const patientRepository =
        app.get<IPatientRepository>(I_PATIENT_REPOSITORY);
      const patient = await patientRepository.findById(result.body.id);

      expect(patient).toBeDefined();
      expect(patient?.props).toEqual({
        id: result.body.id,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        phoneNumber: '+33102030405',
        dateOfBirth: '1980-03-01T00:00:00.000Z',
      });
    });
  });

  describe('Scenario: the user is not authenticated', () => {
    it('should reject', async () => {
      const result = await request(app.getHttpServer())
        .post('/patients')
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

  describe('Scenario: the user is not an admin', () => {
    it('should reject', async () => {
      const result = await request(app.getHttpServer())
        .post('/patients')
        .set('Authorization', await e2eUsers.bob.createAuthorizationToken(app))
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
