import { Patient } from '../entities/patient.entity';
import { IPatientRepository } from '../ports/patient-repository.interface';

export class InMemoryPatientRepository implements IPatientRepository {
  constructor(public readonly database: Patient[] = []) {}

  async save(patient: Patient): Promise<Patient> {
    this.database.push(patient);
    return patient;
  }

  async update(patient: Patient): Promise<void> {
    const index = this.database.findIndex(
      (w) => w.props.id === patient.props.id,
    );
    this.database[index] = patient;
    patient.commit();
  }

  async delete(patient: Patient): Promise<void> {
    const index = this.database.findIndex(
      (p) => p.props.id === patient.props.id,
    );

    this.database.splice(index, 1);
  }

  async findAll(): Promise<Patient[]> {
    return this.database;
  }

  async findById(id: string): Promise<Patient | null> {
    const patient = this.database.find((p) => p.props.id === id);
    return patient ? new Patient({ ...patient.initialState }) : null;
  }

  async findByEmailAddress(email: string): Promise<Patient | null> {
    const patient = this.database.find(
      (patient) => patient.props.email === email,
    );

    return patient ?? null;
  }
}
