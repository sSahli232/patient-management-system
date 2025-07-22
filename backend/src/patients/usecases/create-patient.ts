type PatientProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
};

export class Patient {
  constructor(public props: PatientProps) {}
}

export interface IPatientRepository {
  save(patient: Patient): Promise<void>;
}

export interface IIDGenerator {
  generate(): string;
}

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
