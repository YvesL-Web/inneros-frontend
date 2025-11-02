'use client';

import { useState } from 'react';
import { api, AuthResponseT } from '@/lib/api';
import { z } from 'zod';

const LoginInput = z.object({ email: z.email(), password: z.string().min(8) });

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>();
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);
    const p = LoginInput.safeParse({ email, password });
    if (!p.success) return setError('Entrée invalide');
    try {
      const data = await api<AuthResponseT>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(p.data),
      });
      localStorage.setItem('token', data.token);
      window.location.href = '/';
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Connexion impossible');
    }
  }
  return (
    <main style={{ padding: 24 }}>
      <h2>Connexion</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
      </form>
    </main>
  );
}
