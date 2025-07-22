/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePatientUseCase } from '../usecases/create-patient';

@Controller()
export class PatientController {
  constructor(private readonly createPatient: CreatePatientUseCase) {}

  @Post('/patients')
  async handleCreatePatient(@Body() body: any) {
    return this.createPatient.execute({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      dateOfBirth: body.dateOfBirth,
    });
  }
}
