import NotificationsList from '@/app/components/NotificationsList';

export default function NotificationsPage() {
  return (
    <main style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h2>Notifications</h2>
      <NotificationsList />
    </main>
  );
}
