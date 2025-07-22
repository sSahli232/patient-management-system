import { DateOfBirthInFutureException } from '../exceptions/date-of-birth-in-future';
import { PatientNotFoundException } from '../exceptions/patient-not-found';
import { IDateGenerator } from '../../core/ports/date-generator.interface';
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
  constructor(
    private readonly patientRepository: IPatientRepository,
    private readonly dateGenerator: IDateGenerator,
  ) {}

  async execute(request: Request): Promise<Response> {
    const { id, firstName, lastName, email, phoneNumber, dateOfBirth } =
      request;
    const now = this.dateGenerator.now();
    const patient = await this.patientRepository.findById(request.id);

    if (!patient) {
      throw new PatientNotFoundException();
    }

    patient.update({
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
    });

    if (patient.dateOfBirthInFuture(now)) {
      throw new DateOfBirthInFutureException();
    }

    await this.patientRepository.update(patient);
  }
}
