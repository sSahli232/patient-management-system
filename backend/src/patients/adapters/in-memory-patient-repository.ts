import { Patient } from '../entities/patient.entity';
import { IPatientRepository } from '../ports/patient-repository.interface';

export class InMemoryPatientRepository implements IPatientRepository {
  constructor(public readonly database: Patient[] = []) {}

  async save(patient: Patient): Promise<void> {
    this.database.push(patient);
  }
}
