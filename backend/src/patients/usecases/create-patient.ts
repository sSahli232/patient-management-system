import { Patient } from '../entities/patient.entity';
import { IIDGenerator } from '../ports/id-generator.interface';
import { IPatientRepository } from '../ports/patient-repository.interface';

type Request = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
};

type Response = {
  id: string;
};

export class CreatePatientUseCase {
  constructor(
    private readonly patientRepository: IPatientRepository,
    private readonly idGenerator: IIDGenerator,
  ) {}

  async execute(request: Request): Promise<Response> {
    const id = this.idGenerator.generate();

    await this.patientRepository.save(
      new Patient({
        id: this.idGenerator.generate(),
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phoneNumber: request.phoneNumber,
        dateOfBirth: request.dateOfBirth,
      }),
    );

    return {
      id,
    };
  }
}
