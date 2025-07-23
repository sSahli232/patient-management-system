import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerToggle, MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { firstValueFrom } from 'rxjs';
import { PatientsService } from '../../services/patients.service';
import type { Patient } from '../../models/patient.model';
import { PatientDialogData } from './models/patient-dialog-form.model';

@Component({
  selector: 'app-patient-dialog-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatDatepicker,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './patient-dialog-form.html',
  styleUrl: './patient-dialog-form.scss'
})
export class PatientDialogForm {
  dialogRef = inject(MatDialogRef);

  data: PatientDialogData = inject(MAT_DIALOG_DATA);

  fb = inject(FormBuilder);

  patientService = inject(PatientsService);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    dateOfBirth: [new Date(), Validators.required],
  });

  constructor() {
    this.form.patchValue({
      firstName: this.data.patient?.firstName,
      lastName: this.data.patient?.lastName,
      email: this.data.patient?.email,
      phoneNumber: this.data.patient?.phoneNumber,
      dateOfBirth: this.data.patient?.dateOfBirth ? new Date(this.data.patient.dateOfBirth) : null
    })
  }

  onClose() {
    this.dialogRef.close();
  }

  async onSubmit() {
    const patientProps = this.form.value as Partial<Patient>;

    if (this.data.mode === 'update') {
      await this.updatePatient(this.data.patient!.id, patientProps);
    } else if (this.data.mode === 'create') {
      await this.createPatient(patientProps);
    }
  }

  async createPatient(patient: Partial<Patient>) {
    try {
      const newPatient = await this.patientService.createPatient(patient);
      this.dialogRef.close(newPatient);
    } catch (err) {
      console.error('Error creating patient:', err);
      alert(`Failed to create the patient.`)
    }
  }

  async updatePatient(patientId: string, changes: Partial<Patient>) {
    try {
      const updatedPatient = await this.patientService.updatePatient(patientId, changes);
      this.dialogRef.close(updatedPatient);
    } catch (err) {
      console.error('Error saving patient:', err);
      alert(`Failed to update the patient.`)
    }
  }
}

export async function openPatientDialog(dialog: MatDialog, data: PatientDialogData) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width = "400px";
  config.data = data;

  const close$ = dialog.open(PatientDialogForm, config).afterClosed();

  return firstValueFrom(close$);
}
