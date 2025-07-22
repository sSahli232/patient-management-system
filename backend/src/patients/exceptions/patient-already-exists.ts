export class PatientAlreadyExistsException extends Error {
  constructor() {
    super(
      'Unable to process your request. Please try again or contact support.',
    );
    this.name = 'PatientAlreadyExistsException';
  }
}
