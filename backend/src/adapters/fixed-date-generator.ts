import { IDateGenerator } from '../patients/ports/date-generator.interface';

export class FixedDateGenerator implements IDateGenerator {
  now(): Date {
    return new Date('2025-07-23T00:00:00.000Z');
  }
}
