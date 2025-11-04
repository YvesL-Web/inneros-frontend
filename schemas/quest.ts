import { z } from 'zod';

export const QuestItem = z.object({
  id: z.uuid(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  period: z.enum(['daily', 'weekly']),
  baseXp: z.number().int(),
  premiumOnly: z.boolean(),
  status: z.enum(['locked', 'in_progress', 'completed']),
});

export type QuestItemT = z.infer<typeof QuestItem>;
export const QuestsResponse = z.array(QuestItem);
export type QuestsResponseT = z.infer<typeof QuestsResponse>;
