import { z } from 'zod';

export const schema = z.object({
  email: z.email(),
  password: z.string(),
});

export type CreateUserBody = z.infer<typeof schema>;
