import { FixedDateGenerator } from '../adapters/fixed-date-generator';
import { InMemoryPatientRepository } from '../adapters/in-memory-patient-repository';
import { Patient } from '../entities/patient.entity';
import { UpdatePatientUseCase } from './update-patient';

describe('Feature: updating a patient', () => {
  async function expectPatientToRemainUnchanged() {
    const updatedPatient = await patientRepository.findById('patient-id-1');
    expect(updatedPatient?.props).toEqual(patientJohn.props);
    expect(updatedPatient?.props).toEqual(patientJohn.props);
  }

  const patientJohn = new Patient({
    id: 'patient-id-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@mail.com',
    phoneNumber: '1234567890',
    dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
  });

  let patientRepository: InMemoryPatientRepository;
  let dateGenerator: FixedDateGenerator;
  let useCase: UpdatePatientUseCase;

  beforeEach(() => {
    patientRepository = new InMemoryPatientRepository([patientJohn]);
    dateGenerator = new FixedDateGenerator();
    useCase = new UpdatePatientUseCase(patientRepository, dateGenerator);
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

  describe('Scenario: The date of birth cannot be in the future', () => {
    const payload = {
      id: 'patient-id-1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@mail.com',
      phoneNumber: '1234567890',
      dateOfBirth: new Date('2025-08-20T00:00:00.000Z'),
    };

    it('should throw', async () => {
      await expect(useCase.execute(payload)).rejects.toThrow(
        'Date of birth cannot be in the future!',
      );

      await expectPatientToRemainUnchanged();
    });
  });

  describe('Scenario: The patient does not exist', () => {
    const payload = {
      id: 'patient-id-2',
      firstName: 'Janet',
      lastName: 'Doe',
      email: 'janetdoe@mail.com',
      phoneNumber: '1234567891',
      dateOfBirth: new Date('1985-07-24T00:00:00.000Z'),
    };

    it('should throw', async () => {
      await expect(useCase.execute(payload)).rejects.toThrow(
        'Patient not found!',
      );
    });
  });
});
