import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from '../patients/patients.module';
import { CommonModule } from './common.module';

@Module({
  imports: [PatientsModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
