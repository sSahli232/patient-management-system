import { Patient } from '../entities/patient.entity';
import { IPatientRepository } from '../ports/patient-repository.interface';

export class InMemoryPatientRepository implements IPatientRepository {
  constructor(public readonly database: Patient[] = []) {}

  async save(patient: Patient): Promise<void> {
    this.database.push(patient);
  }

  async findById(id: string): Promise<Patient | null> {
    const patient = this.database.find((p) => p.props.id === id);
    return patient ? new Patient(patient.props) : null;
  }

  async findByEmailAddress(email: string): Promise<Patient | null> {
    const patient = this.database.find(
      (patient) => patient.props.email === email,
    );

    return patient ?? null;
  }
}
