'use client';

import { useGardenItems } from '@/hooks/useGarden';
import { SkeletonRows } from './ui/Skeleton';

export default function GardenList() {
  const { data, isLoading, error } = useGardenItems();
  if (isLoading)
    return (
      <div style={{ padding: 8 }}>
        <SkeletonRows rows={6} />
      </div>
    );
  if (error) return <div style={{ padding: 8, color: 'crimson' }}>Erreur</div>;
  if (!data?.length) return <div style={{ padding: 8, opacity: 0.7 }}>Rien pour l’instant.</div>;

  return (
    <ul style={{ padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
      {data.map((item) => (
        <li
          key={`${item.kind}-${item.id}`}
          style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>{item.title}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>
              {new Date(item.createdAt).toLocaleString()}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span
              style={{
                border: '1px solid #eee',
                padding: '2px 8px',
                borderRadius: 999,
                fontSize: 12,
              }}
            >
              #{item.tag}
            </span>
            {item.xp > 0 && <span style={{ fontSize: 12 }}>+{item.xp} XP</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}
