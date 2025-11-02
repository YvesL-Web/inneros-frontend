'use client';

import { useState } from 'react';
import { api, AuthResponseT } from '@/lib/api';
import { z } from 'zod';

const RegisterInput = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(1).optional(),
});

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | undefined>();
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);
    const p = RegisterInput.safeParse({ email, password, name: name || undefined });
    if (!p.success) return setError('Entrée invalide');
    try {
      const data = await api<AuthResponseT>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(p.data),
      });
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Inscription impossible');
    }
  }
  return (
    <main style={{ padding: 24 }}>
      <h2>Créer un compte</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Nom (optionnel)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">S&apos;inscrire</button>
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
      </form>
    </main>
  );
}
