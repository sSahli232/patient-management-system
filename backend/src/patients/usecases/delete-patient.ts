import { PatientNotFoundException } from '../exceptions/patient-not-found';
import { IPatientRepository } from '../ports/patient-repository.interface';

type Request = {
  patientId: string;
};

type Response = void;

export class DeletePatientUseCase {
  constructor(private readonly patientRepository: IPatientRepository) {}

  async execute({ patientId }: Request): Promise<Response> {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new PatientNotFoundException();
    }

    await this.patientRepository.delete(patient);
  }
}
