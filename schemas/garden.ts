import { z } from 'zod';

export const GardenItem = z.object({
  id: z.uuid(),
  kind: z.enum(['activity', 'quest']),
  tag: z.string(),
  title: z.string(),
  xp: z.number().int(),
  createdAt: z.string(),
});
export type GardenItemT = z.infer<typeof GardenItem>;

export const TagStat = z.object({
  tag: z.string(),
  totalXp: z.number().int(),
  count: z.number().int(),
  lastAt: z.string().nullable(),
});
export type TagStatT = z.infer<typeof TagStat>;

export const TimePoint = z.object({ date: z.string(), xp: z.number().int() });
export type TimePointT = z.infer<typeof TimePoint>;

export const GardenSummaryResponse = z.object({
  series7d: z.array(TimePoint).length(7),
  tags: z.array(TagStat),
});
export type GardenSummaryResponseT = z.infer<typeof GardenSummaryResponse>;
