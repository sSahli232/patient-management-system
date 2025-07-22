/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Module } from '@nestjs/common';
import { RealDateGenerator } from './adapters/real-date-generator';
import { RandomIDGenerator } from './adapters/random-id-generator';
import { InMemoryPatientRepository } from './adapters/in-memory-patient-repository';
import { CreatePatientUseCase } from './usecases/create-patient';
import { PatientController } from './controllers/patient.controller';
import { I_PATIENT_REPOSITORY } from './ports/patient-repository.interface';
import { I_ID_GENERATOR } from './ports/id-generator.interface';
import { I_DATE_GENERATOR } from './ports/date-generator.interface';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [
    {
      provide: I_DATE_GENERATOR,
      useClass: RealDateGenerator,
    },
    {
      provide: I_ID_GENERATOR,
      useClass: RandomIDGenerator,
    },
    {
      provide: I_PATIENT_REPOSITORY,
      useFactory: () => {
        return new InMemoryPatientRepository();
      },
    },
    {
      provide: CreatePatientUseCase,
      inject: [I_PATIENT_REPOSITORY, I_ID_GENERATOR, I_DATE_GENERATOR],
      useFactory: (patientRepository, idGenerator, dateGenerator) => {
        return new CreatePatientUseCase(
          patientRepository,
          idGenerator,
          dateGenerator,
        );
      },
    },
  ],
})
export class PatientsModule {}
