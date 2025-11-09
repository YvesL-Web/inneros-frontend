'use client';

import { useGardenSummary } from '@/hooks/useGarden';
import { Skeleton } from './ui/Skeleton';
import { motion } from 'framer-motion';

export default function GardenPreviewChart() {
  const { data, isLoading, error } = useGardenSummary();
  if (isLoading)
    return (
      <div style={{ padding: 8 }}>
        <Skeleton height={80} />
      </div>
    );
  if (error || !data)
    return <div style={{ padding: 8, color: 'crimson' }}>Erreur de chargement</div>;

  // simple SVG bar chart (7 bars), responsive width
  const max = Math.max(1, ...data.series7d.map((p) => p.xp));
  const height = 80;
  const barGap = 8;
  const barWidth = 24;
  const width = data.series7d.length * (barWidth + barGap) + barGap;

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <strong>Aperçu 7 jours (XP)</strong>
        <span style={{ opacity: 0.7 }}>
          Total: <b>{data.series7d.reduce((a, b) => a + b.xp, 0)}</b>
        </span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        role="img"
        aria-label="XP par jour (7j)"
      >
        {data.series7d.map((p, i) => {
          const h = Math.round((p.xp / max) * (height - 18));
          const x = barGap + i * (barWidth + barGap);
          const y = height - h - 16;
          return (
            <g key={p.date}>
              <rect x={x} y={y} width={barWidth} height={h} rx="4" />
              <text x={x + barWidth / 2} y={height - 4} fontSize="9" textAnchor="middle">
                {new Date(p.date).toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2)}
              </text>
            </g>
          );
        })}
      </svg>

      <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {data.tags.map((t, i) => (
          <motion.span
            key={t.tag}
            className="badge"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.18 }}
          >
            #{t.tag} • {t.totalXp} XP ({t.count})
          </motion.span>
        ))}
      </div>
    </div>
  );
}
