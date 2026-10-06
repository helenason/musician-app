import 'server-only';

import { requireEnv } from './env';

export class ExternalApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

// 외부 API 호출은 전부 이 함수를 거친다. API 키는 서버에서만 헤더에 붙는다.
export async function callExternalApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  const baseUrl = requireEnv('EXTERNAL_API_BASE_URL');
  const apiKey = requireEnv('EXTERNAL_API_KEY');

  const res = await fetch(new URL(path, baseUrl), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
      Authorization: `Bearer ${apiKey}`,
    },
    signal: init.signal ?? AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    throw new ExternalApiError(res.status, `External API responded ${res.status}`);
  }
  return (await res.json()) as T;
}
