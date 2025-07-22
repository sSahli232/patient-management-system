/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Module } from '@nestjs/common';
import { RealDateGenerator } from './adapters/real-date-generator';
import { RandomIDGenerator } from './adapters/random-id-generator';
import { InMemoryPatientRepository } from './adapters/in-memory-patient-repository';
import { CreatePatientUseCase } from './usecases/create-patient';
import { PatientController } from './controllers/patient.controller';

@Module({
  imports: [],
  controllers: [PatientController],
  providers: [
    RealDateGenerator,
    RandomIDGenerator,
    InMemoryPatientRepository,
    {
      provide: CreatePatientUseCase,
      inject: [InMemoryPatientRepository, RandomIDGenerator, RealDateGenerator],
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
