'use client';

import { useCompleteQuest, useQuests } from '@/hooks/useQuests';

export default function Quests() {
  const { data, isLoading, error } = useQuests();
  const { mutate, isPending } = useCompleteQuest();

  if (isLoading) return <div style={{ padding: 8 }}>Chargement des quêtes…</div>;
  if (error)
    return <div style={{ padding: 8, color: 'crimson' }}>Erreur de chargement des quêtes</div>;
  if (!data?.length)
    return <div style={{ padding: 8, opacity: 0.7 }}>Aucune quête disponible.</div>;

  return (
    <div style={{ display: 'grid', gap: 8, padding: 8 }}>
      {data.map((q) => (
        <div
          key={q.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>{q.title}</div>
            <div style={{ opacity: 0.8, fontSize: 13 }}>{q.description}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              Période: {q.period} • XP: {q.baseXp}
            </div>
          </div>
          <button disabled={q.status === 'completed' || isPending} onClick={() => mutate(q.slug)}>
            {q.status === 'completed' ? 'Terminé ✅' : 'Compléter'}
          </button>
        </div>
      ))}
    </div>
  );
}
