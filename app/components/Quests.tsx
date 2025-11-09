'use client';

import { useCompleteQuest, useQuests } from '@/hooks/useQuests';
import { SkeletonRows } from './ui/Skeleton';
import { motion } from 'framer-motion';

export default function Quests() {
  const { data, isLoading, error } = useQuests();
  const { mutate, isPending } = useCompleteQuest();

  if (isLoading)
    return (
      <div style={{ padding: 8 }}>
        <SkeletonRows rows={4} />
      </div>
    );
  if (error)
    return <div style={{ padding: 8, color: 'crimson' }}>Erreur de chargement des quêtes</div>;
  if (!data?.length)
    return <div style={{ padding: 8, opacity: 0.7 }}>Aucune quête disponible.</div>;

  return (
    <div style={{ display: 'grid', gap: 8, padding: 8 }}>
      {data.map((q) => (
        <motion.div
          key={q.id}
          className="card"
          style={{
            padding: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2, boxShadow: '0 12px 30px rgba(0,0,0,.28)' }}
          transition={{ duration: 0.18 }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>{q.title}</div>
            <div style={{ opacity: 0.8, fontSize: 13 }}>{q.description}</div>
            <div className="badge" style={{ marginTop: 6 }}>
              Période: {q.period} • {q.baseXp} XP
            </div>
          </div>
          <button
            className="button-primary"
            disabled={q.status === 'completed' || isPending}
            onClick={() => mutate(q.slug)}
          >
            {q.status === 'completed' ? 'Terminé ✅' : 'Compléter'}
          </button>
        </motion.div>
      ))}
    </div>
  );
}
