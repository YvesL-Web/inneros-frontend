/**
 * ApiError — erreur typée pour le front
 * contient status HTTP, code métier éventuel, et détails
 */
export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;
  constructor(message: string, status: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

type ApiErrorShape = { error?: string; message?: string; details?: unknown };

export function parseApiError(status: number, json: unknown, fallbackText?: string): ApiError {
  const shape = (json ?? {}) as ApiErrorShape;
  const code = typeof shape.error === 'string' ? shape.error : undefined;
  const message =
    typeof shape.message === 'string' ? shape.message : code ?? fallbackText ?? 'API_ERROR';
  const details = shape.details;
  return new ApiError(message, status, code, details);
}

export function isApiError(e: unknown): e is ApiError {
  return e instanceof ApiError;
}
