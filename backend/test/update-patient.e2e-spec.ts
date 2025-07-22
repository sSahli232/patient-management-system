/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Feature: updating a patient', () => {
  describe('Scenario: Happy path', () => {
    it('should succeed', async () => {
      const module = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      const app = module.createNestApplication();
      await app.init();

      const id = 'patient-id-1';

      const result = await request(app.getHttpServer())
        .put(`/patients/${id}`)
        .send({
          id: 'patient-id-1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@mail.com',
          phoneNumber: '1234567890',
          dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
        });

      expect(result.status).toBe(201);
      expect(result.body).toEqual({
        id: expect.any(String),
      });
    });
  });
});
