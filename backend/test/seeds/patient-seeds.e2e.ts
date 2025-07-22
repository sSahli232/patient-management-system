import { PatientFixture } from '../fixtures/patient.fixture';
import { Patient } from '../../src/patients/entities/patient.entity';

export const e2ePatients = {
  johnDoe: new PatientFixture(
    new Patient({
      id: 'patient-id-1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@mail.com',
      phoneNumber: '1234567890',
      dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
    }),
  ),
};
