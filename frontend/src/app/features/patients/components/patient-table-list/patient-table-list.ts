import { Component, inject, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { openPatientDialog } from '../patient-dialog-form/patient-dialog-form';
import type { Patient } from '../../models/patient.model';
import { IfAdminDirective } from '../../../../core/directives/is-admin.directive';

@Component({
  selector: 'app-patient-table-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    DatePipe,
    IfAdminDirective
  ],
  templateUrl: './patient-table-list.html',
  styleUrl: './patient-table-list.scss'
})
export class PatientTableList {
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
