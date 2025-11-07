'use client';

import { useMarkNotificationRead, useNotifications } from '@/hooks/useNotifications';

export default function NotificationsList() {
  const { data, isLoading, error } = useNotifications();
  const { mutate, isPending } = useMarkNotificationRead();

  if (isLoading) return <div style={{ padding: 8 }}>Chargement des notifications…</div>;
  if (error)
    return (
      <div style={{ padding: 8, color: 'crimson' }}>Erreur de chargement des notifications</div>
    );
  if (!data?.length) return <div style={{ padding: 8, opacity: 0.7 }}>Aucune notification.</div>;

  return (
    <ul style={{ padding: 8, display: 'grid', gap: 8, listStyle: 'none' }}>
      {data.map((n) => {
        const read = !!n.readAt;
        return (
          <li
            key={n.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 12,
              background: read ? '#fafafa' : 'white',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Bilan hebdo</div>
                <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 6 }}>
                  Période: {new Date(n.payload.range.start).toLocaleDateString()} →{' '}
                  {new Date(n.payload.range.end).toLocaleDateString()}
                </div>
                <div style={{ fontSize: 13 }}>
                  XP total: <b>{n.payload.totals.xp}</b> • Activités:{' '}
                  <b>{n.payload.totals.activities}</b> • Quêtes:{' '}
                  <b>{n.payload.totals.questsCompleted}</b>
                </div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
                  Reçu le {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
              <button
                disabled={read || isPending}
                onClick={() => mutate(n.id)}
                title={read ? 'Déjà lu' : 'Marquer comme lu'}
              >
                {read ? 'Lu ✅' : 'Marquer comme lu'}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
