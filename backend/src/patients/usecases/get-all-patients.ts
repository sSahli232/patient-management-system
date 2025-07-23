import { IPatientRepository } from '../ports/patient-repository.interface';

type Response = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
}[];

export class GetAllPatients {
  constructor(private readonly patientRepository: IPatientRepository) {}

  async execute(): Promise<Response> {
    const patients = await this.patientRepository.findAll();

    return patients.map((patient) => ({
      id: patient.props.id,
      firstName: patient.props.firstName,
      lastName: patient.props.lastName,
      email: patient.props.email,
      phoneNumber: patient.props.phoneNumber,
      dateOfBirth: patient.props.dateOfBirth,
    }));
  }
}
