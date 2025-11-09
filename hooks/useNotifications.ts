import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { NotificationsList, NotificationsListT } from '@/schemas/notifications';
import { toast } from 'react-hot-toast/headless';

export function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async (): Promise<NotificationsListT> => {
      const data = await api<unknown>('/notifications');
      const parsed = NotificationsList.safeParse(data);
      if (!parsed.success) {
        console.error('Invalid notifications payload', parsed.error.flatten());
        throw new Error('INVALID_NOTIFICATIONS_PAYLOAD');
      }
      return parsed.data;
    },
    staleTime: 30_000,
  });
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return api<{ ok: true }>(`/notifications/${encodeURIComponent(id)}/read`, { method: 'POST' });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notification marquée comme lue');
    },
    onError: () => toast.error('Échec du marquage'),
  });
}
