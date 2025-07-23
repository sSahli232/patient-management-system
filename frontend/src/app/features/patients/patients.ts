import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { openPatientDialog } from './components/patient-dialog-form/patient-dialog-form';
import type { Patient } from './models/patient.model';
import { PatientsService } from './services/patients.service';
import { PatientTableList } from './components/patient-table-list/patient-table-list';
import { IfAdminDirective } from '../../core/directives/is-admin.directive';

@Component({
  selector: 'app-patients',
  imports: [PatientTableList, IfAdminDirective],
  templateUrl: './patients.html',
  styleUrl: './patients.scss'
})
export class Patients {
  patients = signal<Patient[]>([]);

  patientsService = inject(PatientsService);

  dialog = inject(MatDialog);

  constructor() {
    this.loadPatients().then(() => console.log(`All patients loaded:`, this.patients()));
  }

  async loadPatients() {
    try {
      const patients = await this.patientsService.loadAllPatients();
      this.patients.set(patients);
    }
    catch (err) {
      console.error(err);
    }
  }

  onPatientUpdated(updatatedPatient: Patient) {
    const patients = this.patients();

    const newPatients = patients.map(patient => patient.id === updatatedPatient.id ? updatatedPatient : patient);
    this.patients.set(newPatients);
  }

  async onPatientDeleted(patientId: string) {
    try {
      await this.patientsService.deletePatient(patientId);

      const patients = this.patients();
      const newPatients = patients.filter(patient => patient.id !== patientId);
      this.patients.set(newPatients);
    } catch (err) {
      console.error(err);
      alert('Error deleting patient');
    }
  }

  async onAddPatient() {
    const newPatient = await openPatientDialog(this.dialog, { mode: 'create', title: 'Create Patient' });

    const newPatients = [...this.patients(), newPatient];
    this.patients.set(newPatients)
  }
}
