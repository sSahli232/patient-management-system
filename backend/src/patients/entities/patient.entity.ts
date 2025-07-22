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
}
