import { number, z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
  permissionId: z.number(),
  syllabusAccess: z.string(),
  programAccess: z.string(),
  userAccess: z.string(),
  classAccess: z.string(),
  materialAccess: z.string(),
  roleID: z.number(),
  role: z.string(),
});

export type Role = z.infer<typeof userSchema>;
