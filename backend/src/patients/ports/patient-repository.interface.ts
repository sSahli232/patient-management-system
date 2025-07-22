import { Patient } from '../entities/patient.entity';

export interface IPatientRepository {
  save(patient: Patient): Promise<void>;
  findByEmailAddress(email: string): Promise<Patient | null>;
}
