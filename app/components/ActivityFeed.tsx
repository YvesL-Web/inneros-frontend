'use client';

import { useActivities } from '@/hooks/useActivities';
import { SkeletonRows } from './ui/Skeleton';
import { motion } from 'framer-motion';

export default function ActivityFeed() {
  const { data, isLoading, error } = useActivities();
  if (isLoading)
    return (
      <div style={{ padding: 8 }}>
        <SkeletonRows rows={5} />
      </div>
    );
  if (error) return <div style={{ padding: 8, color: 'crimson' }}>Erreur de chargement</div>;
  if (!data?.length)
    return <div style={{ padding: 8, opacity: 0.7 }}>Aucune activité pour l’instant.</div>;

  return (
    <ul style={{ padding: 8 }}>
      {data.map((a) => (
        <li key={a.id}>
          <motion.div
            className="card"
            style={{
              padding: 10,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.16 }}
          >
            {/* contenu existant */}
          </motion.div>
        </li>
      ))}
    </ul>
  );
}
