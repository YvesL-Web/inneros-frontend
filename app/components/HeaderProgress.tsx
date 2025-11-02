'use client';

import { useProgress } from '@/hooks/useProgress';

export default function HeaderProgress() {
  const { data, isLoading, error } = useProgress();
  console.log(data);
  if (isLoading) return <div style={{ padding: 8 }}>Chargement…</div>;
  if (error) return <div style={{ padding: 8, color: 'crimson' }}>Erreur de chargement</div>;
  if (!data) return null;

  return (
    <div style={{ padding: 8, display: 'flex', gap: 12, alignItems: 'baseline' }}>
      <span>
        XP: <b>{data.xp}</b>
      </span>
      <span>
        Niveau: <b>{data.level}</b>
      </span>
      <span>
        Streak: <b>{data.streak}🔥</b>
      </span>
      {data.lastSeen && (
        <small style={{ opacity: 0.7 }}>(vu {new Date(data.lastSeen).toLocaleString()})</small>
      )}
    </div>
  );
}
