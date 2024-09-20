import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  dateOfBirth: z.string(),
  gender: z.string(),
  type: z.string(),
});

export type User = z.infer<typeof userSchema>;
