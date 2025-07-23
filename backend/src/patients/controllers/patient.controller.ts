import {
  Body,
  Controller,
  Delete,
  Get,
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
import { GetPatientByIdResponse } from './dtos/get-patient-by-id-response';
import { GetPatientById } from '../usecases/get-patient-by-id';
import { GetAllPatientsResponse } from './dtos/get-all-patients-response';
import { GetAllPatients } from '../usecases/get-all-patients';
import { Roles } from '../../auth/decorators/roles.decorator';

// TODO: improve Error Handling thanks to a NestJS filter to map domain errors.

@Controller()
export class PatientController {
  constructor(
    private readonly createPatient: CreatePatientUseCase,
    private readonly updatePatient: UpdatePatientUseCase,
    private readonly deletePatient: DeletePatientUseCase,
    private readonly getPatientById: GetPatientById,
    private readonly getAllPatients: GetAllPatients,
  ) {}

  @Roles('admin')
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

  @Get('/patients')
  async handleGetAllPatient(): Promise<GetAllPatientsResponse> {
    return this.getAllPatients.execute();
  }

  @Get('/patients/:id')
  async handleGetPatientById(
    @Param('id') id: string,
  ): Promise<GetPatientByIdResponse> {
    return this.getPatientById.execute({ patientId: id });
  }

  @Roles('admin')
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

  @Roles('admin')
  @Delete('/patients/:id')
  async handleDeletePatient(
    @Param('id') id: string,
  ): Promise<DeletePatientResponse> {
    return this.deletePatient.execute({ patientId: id });
  }
}
