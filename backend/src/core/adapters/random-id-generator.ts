import { IIDGenerator } from '../ports/id-generator.interface';
import { v7 as uuidv7 } from 'uuid';

export class RandomIDGenerator implements IIDGenerator {
  generate(): string {
    return uuidv7();
  }
}
