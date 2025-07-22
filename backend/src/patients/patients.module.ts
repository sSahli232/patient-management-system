/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Module } from '@nestjs/common';
import { InMemoryPatientRepository } from './adapters/in-memory-patient-repository';
import { CreatePatientUseCase } from './usecases/create-patient';
import { PatientController } from './controllers/patient.controller';
import { I_PATIENT_REPOSITORY } from './ports/patient-repository.interface';
import { I_ID_GENERATOR } from '../core/ports/id-generator.interface';
import { I_DATE_GENERATOR } from '../core/ports/date-generator.interface';
import { CommonModule } from '../core/common.module';

@Module({
  imports: [CommonModule],
  controllers: [PatientController],
  providers: [
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
  exports: [I_PATIENT_REPOSITORY],
})
export class PatientsModule {}
