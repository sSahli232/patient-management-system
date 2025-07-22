import { Patient } from '../entities/patient.entity';
import { IIDGenerator } from '../ports/id-generator.interface';
import { IPatientRepository } from '../ports/patient-repository.interface';
import { CreatePatientUseCase } from './create-patient';

class InMemoryPatientRepository implements IPatientRepository {
  constructor(public readonly database: Patient[] = []) {}

  async save(patient: Patient): Promise<void> {
    this.database.push(patient);
  }
}

class FixedIDGenerator implements IIDGenerator {
  generate(): string {
    return 'patient-id-1';
  }
}

describe('Feature: Creating a patient', () => {
  describe('Scenario: Happy path', () => {
    it('should insert the patient into the database', async () => {
      const patientRespository = new InMemoryPatientRepository();
      const idGenerator = new FixedIDGenerator();
      const useCase = new CreatePatientUseCase(patientRespository, idGenerator);

      await useCase.execute({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@mail.com',
        phoneNumber: '1234567890',
        dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
      });

      const createdPatient = patientRespository.database[0];

      expect(createdPatient.props).toEqual({
        id: 'patient-id-1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@mail.com',
        phoneNumber: '1234567890',
        dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
      });
    });

    it('should return the patient ID', async () => {
      const patientRespository = new InMemoryPatientRepository();
      const idGenerator = new FixedIDGenerator();
      const useCase = new CreatePatientUseCase(patientRespository, idGenerator);

      const result = await useCase.execute({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@mail.com',
        phoneNumber: '1234567890',
        dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
      });

      expect(result.id).toEqual('patient-id-1');
    });
  });
});
