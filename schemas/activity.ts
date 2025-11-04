import { z } from 'zod';

export const ActivityType = z.enum(['journal_entry', 'meditation']);
export type ActivityTypeT = z.infer<typeof ActivityType>;

export const ActivityItem = z.object({
  id: z.uuid(),
  type: ActivityType,
  baseXp: z.number().int(),
  xpEarned: z.number().int(),
  createdAt: z.string(), // ISO
});
export type ActivityItemT = z.infer<typeof ActivityItem>;

export const CreateActivityInput = z.object({
  type: ActivityType,
  meta: z.record(z.string(), z.unknown()).optional(),
});
export type CreateActivityInputT = z.infer<typeof CreateActivityInput>;
