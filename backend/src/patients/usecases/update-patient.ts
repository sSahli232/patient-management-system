import { IPatientRepository } from '../ports/patient-repository.interface';

type Request = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
};

type Response = void;

export class UpdatePatientUseCase {
  constructor(private readonly patientRepository: IPatientRepository) {}

  async execute(request: Request): Promise<Response> {
    const { id, firstName, lastName, email, phoneNumber, dateOfBirth } =
      request;
    const patient = await this.patientRepository.findById(request.id);

    patient?.update({
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
    });

    await this.patientRepository.update(patient!);
  }
}
