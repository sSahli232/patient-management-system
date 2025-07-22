import { z } from 'zod';

export const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  phoneNumber: z.string(),
  dateOfBirth: z.date(),
});

export type UpdatePatientBody = z.infer<typeof schema>;
