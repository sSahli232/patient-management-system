export class PatientNotFoundException extends Error {
  constructor() {
    super('Patient not found!');
    this.name = 'PatientNotFoundException';
  }
}
