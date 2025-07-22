import { Patient } from '../entities/patient.entity';

export interface IPatientRepository {
  save(patient: Patient): Promise<void>;
}
