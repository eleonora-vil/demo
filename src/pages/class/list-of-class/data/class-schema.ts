import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const classSchema = z.object({
  ClassId: z.string(),
  ClassName: z.string(),
  ProgramId: z.string().email(),
  InstructorId: z.string(),
  StartDate: z.string(),
  EndDate: z.string(),
  Time: z.string(),
  Status: z.string(),
});

export type Class = z.infer<typeof classSchema>;
