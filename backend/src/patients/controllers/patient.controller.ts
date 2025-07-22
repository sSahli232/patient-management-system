import { Body, Controller, Post } from '@nestjs/common';
import { CreatePatientUseCase } from '../usecases/create-patient';
import { CreatePatient } from './dtos/create-patient-body';

@Controller()
export class PatientController {
  constructor(private readonly createPatient: CreatePatientUseCase) {}

  @Post('/patients')
  async handleCreatePatient(@Body() body: CreatePatient) {
    return this.createPatient.execute({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      dateOfBirth: body.dateOfBirth,
    });
  }
}
