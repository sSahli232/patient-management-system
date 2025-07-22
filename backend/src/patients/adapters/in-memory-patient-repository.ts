import { Patient } from '../entities/patient.entity';
import { IPatientRepository } from '../ports/patient-repository.interface';

export class InMemoryPatientRepository implements IPatientRepository {
  constructor(public readonly database: Patient[] = []) {}

  async save(patient: Patient): Promise<void> {
    this.database.push(patient);
  }

  async findByEmailAddress(email: string): Promise<Patient | null> {
    const patient = this.database.find(
      (patient) => patient.props.email === email,
    );

    return patient ?? null;
  }
}
