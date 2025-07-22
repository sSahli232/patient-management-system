/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test } from '@nestjs/testing';
// import { PatientsModule } from 'src/patients/patients.module';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Feature: creating a patient', () => {
  it('should create a patient', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app = module.createNestApplication();
    await app.init();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = await request(app.getHttpServer())
      .post('/patients')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        phoneNumber: '+33102030405',
        dateOfBirth: new Date('1980-03-01T00:00:00.000Z'),
      });

    expect(result.status).toBe(201);
    expect(result.body).toEqual({
      id: expect.any(String),
    });
  });
});
