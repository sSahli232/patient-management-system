import { Patient } from '../entities/patient.entity';

export interface IPatientRepository {
  save(patient: Patient): Promise<void>;
  update(patient: Patient): Promise<void>;
  findById(id: string): Promise<Patient | null>;
  findByEmailAddress(email: string): Promise<Patient | null>;
}
