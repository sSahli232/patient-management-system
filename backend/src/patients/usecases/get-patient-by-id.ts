import { PatientNotFoundException } from '../exceptions/patient-not-found';
import { IPatientRepository } from '../ports/patient-repository.interface';

type Request = {
  patientId: string;
};

type Response = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
};

export class GetPatientById {
  constructor(private readonly patientRepository: IPatientRepository) {}

  async execute({ patientId }: Request): Promise<Response> {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new PatientNotFoundException();
    }

    return {
      id: patient.props.id,
      firstName: patient.props.firstName,
      lastName: patient.props.lastName,
      email: patient.props.email,
      phoneNumber: patient.props.phoneNumber,
      dateOfBirth: patient.props.dateOfBirth,
    };
  }
}
