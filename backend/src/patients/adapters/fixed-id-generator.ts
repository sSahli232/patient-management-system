import { IIDGenerator } from '../ports/id-generator.interface';

export class FixedIDGenerator implements IIDGenerator {
  generate(): string {
    return 'patient-id-1';
  }
}
