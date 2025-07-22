import { Entity } from '../../shared/entity';
type PatientProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
};

export class Patient extends Entity<PatientProps> {
  dateOfBirthInFuture(now: Date): boolean {
    return this.props.dateOfBirth > now;
  }
}
