import { e2ePatients } from './seeds/patient-seeds.e2e';
import { TestApp } from './utils/test-app';
import * as request from 'supertest';
import {
  I_PATIENT_REPOSITORY,
  IPatientRepository,
} from '../src/patients/ports/patient-repository.interface';
import { e2eUsers } from './seeds/user-seeds.e2e';

describe('Feature: cancelling a patient', () => {
  let app: TestApp;

  beforeEach(async () => {
    app = new TestApp();
    await app.setup();
    await app.loadFixtures([e2eUsers.alice, e2ePatients.johnDoe]);
  });

  afterEach(async () => {
    await app.cleanup();
  });

  describe('Scenario: Happy path', () => {
    it('should succeed', async () => {
      const id = e2ePatients.johnDoe.entity.props.id;

      const result = await request(app.getHttpServer())
        .delete(`/patients/${id}`)
        .set(
          'Authorization',
          await e2eUsers.alice.createAuthorizationToken(app),
        );
      expect(result.status).toBe(200);

      const patientRepository =
        app.get<IPatientRepository>(I_PATIENT_REPOSITORY);

      const patient = await patientRepository.findById(id);

      expect(patient).toBeNull();
    });
  });

  describe('Scenario: the user is not authenticated', () => {
    it('should reject', async () => {
      const id = e2ePatients.johnDoe.entity.props.id;
      const result = await request(app.getHttpServer())
        .delete(`/patients/${id}`)
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
