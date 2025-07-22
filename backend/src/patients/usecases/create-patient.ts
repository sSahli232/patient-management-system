import { Patient } from '../entities/patient.entity';
import { DateOfBirthInFutureException } from '../exceptions/date-of-birth-in-future';
import { PatientAlreadyExistsException } from '../exceptions/patient-already-exists';
import { IDateGenerator } from '../ports/date-generator.interface';
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
    private readonly datGenerator: IDateGenerator,
  ) {}

  async execute(request: Request): Promise<Response> {
    const existingPatient = await this.patientRepository.findByEmailAddress(
      request.email,
    );

    if (existingPatient?.props.email === request.email) {
      throw new PatientAlreadyExistsException();
    }

    const id = this.idGenerator.generate();
    const now = this.datGenerator.now();
    const patient = new Patient({
      id,
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      phoneNumber: request.phoneNumber,
      dateOfBirth: request.dateOfBirth,
    });

    if (patient.dateOfBirthInFuture(now)) {
      throw new DateOfBirthInFutureException();
    }

    await this.patientRepository.save(patient);

    return {
      id,
    };
  }
}
