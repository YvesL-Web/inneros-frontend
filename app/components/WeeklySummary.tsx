'use client';

import { useWeeklySummary } from '@/hooks/useWeeklySummary';

export default function WeeklySummary() {
  const { data, isLoading, error } = useWeeklySummary();

  if (isLoading) return <div style={{ padding: 8 }}>Chargement du bilan hebdo…</div>;
  if (error)
    return <div style={{ padding: 8, color: 'crimson' }}>Erreur de chargement du bilan hebdo</div>;
  if (!data) return null;

  return (
    <section style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
      <h3 style={{ marginTop: 0 }}>Bilan de la semaine</h3>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
        <div>
          XP total: <b>{data.totals.xp}</b>
        </div>
        <div>
          Activités: <b>{data.totals.activities}</b>
        </div>
        <div>
          Quêtes complétées: <b>{data.totals.questsCompleted}</b>
        </div>
        <div>
          Streak actuel: <b>{data.progress.streak}</b>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 6 }}>Jour</th>
            <th style={{ textAlign: 'right', borderBottom: '1px solid #eee', padding: 6 }}>
              Activités
            </th>
            <th style={{ textAlign: 'right', borderBottom: '1px solid #eee', padding: 6 }}>XP</th>
            <th style={{ textAlign: 'right', borderBottom: '1px solid #eee', padding: 6 }}>
              Quêtes
            </th>
          </tr>
        </thead>
        <tbody>
          {data.byDay.map((b) => (
            <tr key={b.date}>
              <td style={{ padding: 6 }}>{new Date(b.date).toLocaleDateString()}</td>
              <td style={{ padding: 6, textAlign: 'right' }}>{b.activities}</td>
              <td style={{ padding: 6, textAlign: 'right' }}>{b.xp}</td>
              <td style={{ padding: 6, textAlign: 'right' }}>{b.questsCompleted}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <small style={{ opacity: 0.7 }}>
        Période: {new Date(data.range.start).toLocaleDateString()} →{' '}
        {new Date(data.range.end).toLocaleDateString()}
      </small>
    </section>
  );
}
