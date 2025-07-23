import { InMemoryPatientRepository } from '../adapters/in-memory-patient-repository';
import { Patient } from '../entities/patient.entity';
import { DeletePatientUseCase } from './delete-patient';

describe('Feature: Deleting a patient', () => {
  const johnDoe = new Patient({
    id: 'patient-id-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoemail.com',
    phoneNumber: '0102030405',
    dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
  });

  let patientReposiotry: InMemoryPatientRepository;
  let useCase: DeletePatientUseCase;

  beforeEach(() => {
    patientReposiotry = new InMemoryPatientRepository([johnDoe]);
    useCase = new DeletePatientUseCase(patientReposiotry);
  });

  describe('Scenario: Happy path', () => {
    const payload = {
      patientId: 'patient-id-1',
    };

    it('should delete a patient', async () => {
      await useCase.execute(payload);

      const storedPatient = await patientReposiotry.findById(payload.patientId);

      expect(storedPatient).toBeNull();
    });
  });
});
