import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePatientUseCase } from '../usecases/create-patient';
import { CreatePatientBody } from './dtos/create-patient-body';
import { CreatePatientResponse } from './dtos/create-patient-response';
import { UpdatePatientResponse } from './dtos/update-patient-response';
import { UpdatePatientBody } from './dtos/update-patient-body';
import { UpdatePatientUseCase } from '../usecases/update-patient';
import { DeletePatientUseCase } from '../usecases/delete-patient';
import { DeletePatientResponse } from './dtos/delete-patient-response';

@Controller()
export class PatientController {
  constructor(
    private readonly createPatient: CreatePatientUseCase,
    private readonly updatePatient: UpdatePatientUseCase,
    private readonly deletePatient: DeletePatientUseCase,
  ) {}

  @Post('/patients')
  async handleCreatePatient(
    @Body() body: CreatePatientBody,
  ): Promise<CreatePatientResponse> {
    return this.createPatient.execute({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      dateOfBirth: body.dateOfBirth,
    });
  }

  @HttpCode(200)
  @Put('/patients/:id/edit')
  async handleUpdatePatient(
    @Param('id') id: string,
    @Body() body: UpdatePatientBody,
  ): Promise<UpdatePatientResponse> {
    return this.updatePatient.execute({
      id,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phoneNumber: body.phoneNumber,
      dateOfBirth: body.dateOfBirth,
    });
  }

  @Delete('/patients/:id')
  async handleDeletePatient(
    @Param('id') id: string,
  ): Promise<DeletePatientResponse> {
    return this.deletePatient.execute({ patientId: id });
  }
}
