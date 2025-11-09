'use client';

import { useProgress } from '@/hooks/useProgress';
import { isApiError } from '@/lib/errors';
import { SkeletonRows } from './ui/Skeleton';

export default function HeaderProgress() {
  const { data, isLoading, error } = useProgress();
  if (isLoading)
    return (
      <div style={{ padding: 8, maxWidth: 320 }}>
        <SkeletonRows rows={2} />
      </div>
    );
  if (error) {
    if (isApiError(error)) {
      return (
        <div style={{ padding: 8, color: 'crimson' }}>
          Erreur {error.status}
          {error.code ? ` (${error.code})` : ''} : {error.message}
        </div>
      );
    }
    return <div style={{ padding: 8, color: 'crimson' }}>Erreur de chargement</div>;
  }
  if (!data) return null;
  return (
    <div style={{ padding: 8, display: 'flex', gap: 12 }}>
      <span>
        XP: <b>{data.xp}</b>
      </span>
      <span>
        Niveau: <b>{data.level}</b>
      </span>
      <span>
        Streak: <b>{data.streak}🔥</b>
      </span>
    </div>
  );
}
