import { IFixture } from '../utils/fixture';
import { Patient } from '../../src/patients/entities/patient.entity';
import { TestApp } from 'test/utils/test-app';
import {
  I_PATIENT_REPOSITORY,
  IPatientRepository,
} from '../../src/patients/ports/patient-repository.interface';

export class PatientFixture implements IFixture {
  constructor(public entity: Patient) {}

  async load(app: TestApp): Promise<void> {
    const patientRepository = app.get<IPatientRepository>(I_PATIENT_REPOSITORY);
    await patientRepository.save(this.entity);
  }
}
