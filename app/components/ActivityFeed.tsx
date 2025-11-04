'use client';

import { useActivities } from '@/hooks/useActivities';

export default function ActivityFeed() {
  const { data, isLoading, error } = useActivities();
  if (isLoading) return <div style={{ padding: 8 }}>Chargement…</div>;
  if (error) return <div style={{ padding: 8, color: 'crimson' }}>Erreur de chargement</div>;
  if (!data?.length)
    return <div style={{ padding: 8, opacity: 0.7 }}>Aucune activité pour l’instant.</div>;

  return (
    <ul style={{ padding: 8 }}>
      {data.map((a) => (
        <li key={a.id} style={{ marginBottom: 8 }}>
          <code>{a.type}</code> • +{a.xpEarned} XP • {new Date(a.createdAt).toLocaleString()}
        </li>
      ))}
    </ul>
  );
}
