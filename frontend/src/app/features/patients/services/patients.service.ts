import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import type { Patient } from "../models/patient.model";
import { environment } from "../../../../environments/environment";

type GetPatientsResponse = Patient[];
type GetPatientResponse = Patient;

@Injectable({
  providedIn: "root"
})
export class PatientsService {

  http = inject(HttpClient);

  env = environment;

  async loadAllPatients(): Promise<Patient[]> {
    const patients$ = this.http.get<GetPatientsResponse>(`${this.env.apiUrl}/patients`);

    const response = await firstValueFrom(patients$);

    return response;
  }

  async loadPatient(patientId: string): Promise<Patient> {
    const patient$ = this.http.get<GetPatientResponse>(`${this.env.apiUrl}/patients/${patientId}`);

    const response = await firstValueFrom(patient$);

    return response;
  }

  async createPatient(patient: Partial<Patient>): Promise<Patient> {
    const patient$ = this.http.post<Patient>(`${this.env.apiUrl}/patients`, patient);
    return firstValueFrom(patient$);
  }

  async updatePatient(patientId: string, changes: Partial<Patient>): Promise<Patient> {
    const patient$ = this.http.put<Patient>(`${this.env.apiUrl}/patients/${patientId}/edit`, changes);
    return firstValueFrom(patient$);
  }

  async deletePatient(patientId: string) {
    const delete$ = this.http.delete(`${this.env.apiUrl}/patients/${patientId}`);
    return firstValueFrom(delete$);
  }
}

