import { z } from 'zod';

export const ProgressResponse = z.object({
  xp: z.number().int().nonnegative(),
  level: z.number().int().positive(),
  streak: z.number().int().nonnegative(),
  lastSeen: z.string().nullable(),
});

export type ProgressResponseT = z.infer<typeof ProgressResponse>;
