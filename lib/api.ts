import { z } from 'zod';
import { parseApiError } from '@/lib/errors';

type JsonUnknown = unknown;

/**
 * ✅ Contrats Zod partagés
 */
export const AuthResponse = z.object({
  token: z.string(),
  user: z.object({
    id: z.uuid(),
    email: z.email(),
    name: z.string().nullable().optional(),
  }),
});
export type AuthResponseT = z.infer<typeof AuthResponse>;

/**
 * ✅ Low-level utilitaire : fetch JSON proprement typé
 * Lance un ApiError (typé) quand la réponse n'est pas OK.
 */
async function fetchJson<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string> | undefined),
  };

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, { ...init, headers });
  const text = await res.text();

  // Try to parse JSON body if present
  let json: JsonUnknown = undefined;
  try {
    json = text ? JSON.parse(text) : undefined;
  } catch {
    // keep json as undefined; may still throw ApiError with raw text
  }

  if (!res.ok) {
    throw parseApiError(res.status, json, text);
  }

  return json as T;
}

/**
 * ✅ High-level utilitaire : wrapper avec baseURL
 */
export async function api<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? '';
  const url = path.startsWith('http') ? path : `${base}${path}`;
  return fetchJson<T>(url, init);
}

/**
 * ✅ Constantes de clés React Query
 */
export const queryKeys = {
  me: ['me'] as const,
  progress: ['progress'] as const,
};
