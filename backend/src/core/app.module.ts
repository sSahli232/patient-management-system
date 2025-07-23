import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from '../patients/patients.module';
import { CommonModule } from './common.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, PatientsModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
