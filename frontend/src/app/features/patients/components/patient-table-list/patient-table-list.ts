import { Component, inject, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from '../../models/patient.model';
import { openPatientDialog } from '../patient-dialog-form/patient-dialog-form';

@Component({
  selector: 'app-patient-table-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    DatePipe
  ],
  templateUrl: './patient-table-list.html',
  styleUrl: './patient-table-list.scss'
})
export class PatientsTabList {
  patients = input.required<Patient[]>();

  patientUpdated = output<Patient>();
  patientDeleted = output<string>();

  dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'name',
    'email',
    'phoneNumber',
    'dateOfBirth',
    'actions'
  ];

  getFullName(patient: Patient): string {
    return `${patient.firstName} ${patient.lastName}`;
  }

  async onEditPatient(patient: Patient) {
    const editedPatient = await openPatientDialog(this.dialog, { mode: 'update', title: 'Update Patient', patient });

    this.patientUpdated.emit(editedPatient);
  }

  onDeletePatient(patient: Patient) {
    this.patientDeleted.emit(patient.id);
  }
}
