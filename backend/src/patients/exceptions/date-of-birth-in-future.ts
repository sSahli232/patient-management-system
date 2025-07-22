export class DateOfBirthInFutureException extends Error {
  constructor() {
    super('Date of birth cannot be in the future!');
    this.name = 'DateOfBirthInFutureException';
  }
}
