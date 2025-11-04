import { z } from 'zod';

export const DailyBucket = z.object({
  date: z.string(),
  activities: z.number().int(),
  xp: z.number().int(),
  questsCompleted: z.number().int(),
});

export const WeeklySummaryResponse = z.object({
  range: z.object({ start: z.string(), end: z.string() }),
  totals: z.object({
    activities: z.number().int(),
    xp: z.number().int(),
    questsCompleted: z.number().int(),
  }),
  byDay: z.array(DailyBucket).length(7),
  progress: z.object({
    xp: z.number().int(),
    level: z.number().int(),
    streak: z.number().int(),
    lastSeen: z.string().nullable(),
  }),
});

export type WeeklySummaryResponseT = z.infer<typeof WeeklySummaryResponse>;
