import { Patient } from "../../../models/patient.model";

export type PatientDialogData = {
  mode: 'create' | 'update';
  title: string;
  patient?: Patient;
}
