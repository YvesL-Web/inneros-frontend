import { z } from 'zod';

export const NotificationItem = z.object({
  id: z.uuid(),
  type: z.literal('weekly_summary'),
  payload: z.object({
    range: z.object({ start: z.string(), end: z.string() }),
    totals: z.object({
      activities: z.number().int(),
      xp: z.number().int(),
      questsCompleted: z.number().int(),
    }),
    progress: z.object({
      xp: z.number().int(),
      level: z.number().int(),
      streak: z.number().int(),
      lastSeen: z.string().nullable(),
    }),
  }),
  createdAt: z.string(),
  readAt: z.string().nullable(),
});

export type NotificationItemT = z.infer<typeof NotificationItem>;

export const NotificationsList = z.array(NotificationItem);
export type NotificationsListT = z.infer<typeof NotificationsList>;
