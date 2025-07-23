import { Patient } from '../entities/patient.entity';

export const I_PATIENT_REPOSITORY = Symbol('I_PATIENT_REPOSITORY');
export interface IPatientRepository {
  save(patient: Patient): Promise<Patient>;
  update(patient: Patient): Promise<void>;
  delete(patient: Patient): Promise<void>;
  findAll(): Promise<Patient[]>;
  findById(id: string): Promise<Patient | null>;
  findByEmailAddress(email: string): Promise<Patient | null>;
}
