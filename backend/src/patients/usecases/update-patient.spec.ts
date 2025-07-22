import { InMemoryPatientRepository } from '../adapters/in-memory-patient-repository';
import { Patient } from '../entities/patient.entity';
import { UpdatePatientUseCase } from './update-patient';

describe('Feature: updating a patient', () => {
  const patientJohn = new Patient({
    id: 'patient-id-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@mail.com',
    phoneNumber: '1234567890',
    dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
  });

  let patientRepository: InMemoryPatientRepository;
  let useCase: UpdatePatientUseCase;

  beforeEach(() => {
    patientRepository = new InMemoryPatientRepository([patientJohn]);
    useCase = new UpdatePatientUseCase(patientRepository);
  });

  describe('Scenario: Happy path', () => {
    const payload = {
      id: 'patient-id-1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@mail.com',
      phoneNumber: '0102030405',
      dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
    };
    it('should updtate the patient', async () => {
      await useCase.execute(payload);

      const patient = await patientRepository.findById('patient-id-1');

      expect(patient!.props).toEqual({
        id: 'patient-id-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@mail.com',
        phoneNumber: '0102030405',
        dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
      });
    });
  });
});
