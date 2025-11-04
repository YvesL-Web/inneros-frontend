'use client';

import { useCreateActivity } from '@/hooks/useActivities';
import { useState } from 'react';

export default function AddActivity() {
  const [type, setType] = useState<'journal_entry' | 'meditation'>('journal_entry');
  const [content, setContent] = useState('');
  const [duration, setDuration] = useState(10);
  const { mutate, isPending, error } = useCreateActivity();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const meta = type === 'journal_entry' ? { content } : { durationMin: duration };
    mutate({ type, meta });
    setContent('');
  }

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 520, padding: 8 }}>
      <label>
        Type:
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'journal_entry' | 'meditation')}
        >
          <option value="journal_entry">Journal</option>
          <option value="meditation">Méditation</option>
        </select>
      </label>

      {type === 'journal_entry' ? (
        <textarea
          placeholder="Écris 1–3 phrases…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          maxLength={4000}
        />
      ) : (
        <input
          type="number"
          min={1}
          max={240}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="Durée (minutes)"
        />
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Envoi…' : 'Ajouter'}
      </button>
      {error && <div style={{ color: 'crimson' }}>Erreur: {(error as Error).message}</div>}
    </form>
  );
}
