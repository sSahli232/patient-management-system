/* eslint-disable @typescript-eslint/no-unsafe-argument */

import * as request from 'supertest';
import { TestApp } from './utils/test-app';
import { e2ePatients } from './seeds/patient-seeds.e2e';
import {
  I_PATIENT_REPOSITORY,
  IPatientRepository,
} from '../src/patients/ports/patient-repository.interface';

describe('Feature: updating a patient', () => {
  let app: TestApp;

  beforeEach(async () => {
    app = new TestApp();
    await app.setup();
    await app.loadFixtures([e2ePatients.johnDoe]);
  });

  afterEach(async () => {
    await app.cleanup();
  });

  describe('Scenario: Happy path', () => {
    it('should succeed', async () => {
      const id = 'patient-id-1';

      const result = await request(app.getHttpServer())
        .put(`/patients/${id}/edit`)
        .send({
          id,
          firstName: 'John',
          lastName: 'Doe 2',
          email: 'johndoe@mail.com',
          phoneNumber: '0102030405',
          dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
        });

      expect(result.status).toBe(200);

      const patientRepository =
        app.get<IPatientRepository>(I_PATIENT_REPOSITORY);
      const patient = await patientRepository.findById(id);

      expect(patient).toBeDefined();
      expect(patient?.props).toEqual({
        id: 'patient-id-1',
        firstName: 'John',
        lastName: 'Doe 2',
        email: 'johndoe@mail.com',
        phoneNumber: '0102030405',
        dateOfBirth: '1990-01-01T00:00:00.000Z',
      });
    });
  });
});
