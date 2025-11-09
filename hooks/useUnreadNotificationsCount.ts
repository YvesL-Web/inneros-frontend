import { useNotifications } from './useNotifications';

export function useUnreadNotificationsCount() {
  const { data } = useNotifications();
  const count = data?.filter((n) => !n.readAt).length ?? 0;
  return count;
}
