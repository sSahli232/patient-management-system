type PatientProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
};

export class Patient {
  constructor(public props: PatientProps) {}

  dateOfBirthInFuture(now: Date): boolean {
    return this.props.dateOfBirth > now;
  }
}
