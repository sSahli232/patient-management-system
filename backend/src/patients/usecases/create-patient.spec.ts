import { CreatePatientUseCase } from './create-patient';
import { InMemoryPatientRepository } from '../../adapters/in-memory-patient-repository';
import { FixedIDGenerator } from '../../adapters/fixed-id-generator';

describe('Feature: Creating a patient', () => {
  let patientRespository: InMemoryPatientRepository;
  let idGenerator: FixedIDGenerator;
  let useCase: CreatePatientUseCase;

  beforeEach(() => {
    patientRespository = new InMemoryPatientRepository();
    idGenerator = new FixedIDGenerator();
    useCase = new CreatePatientUseCase(patientRespository, idGenerator);
  });

  describe('Scenario: Happy path', () => {
    const payload = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@mail.com',
      phoneNumber: '1234567890',
      dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
    };

    it('should insert the patient into the database', async () => {
      await useCase.execute(payload);

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
      const result = await useCase.execute(payload);

      expect(result.id).toEqual('patient-id-1');
    });
  });
});
