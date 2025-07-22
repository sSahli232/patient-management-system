import { Module } from '@nestjs/common';
import { RandomIDGenerator } from './adapters/random-id-generator';
import { I_DATE_GENERATOR } from './ports/date-generator.interface';
import { I_ID_GENERATOR } from './ports/id-generator.interface';
import { RealDateGenerator } from './adapters/real-date-generator';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: I_DATE_GENERATOR,
      useClass: RealDateGenerator,
    },
    {
      provide: I_ID_GENERATOR,
      useClass: RandomIDGenerator,
    },
  ],
  exports: [I_DATE_GENERATOR, I_ID_GENERATOR],
})
export class CommonModule {}
