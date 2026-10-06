import { callExternalApi, ExternalApiError } from '@/lib/server/external-api';

// 프록시 예시: 브라우저 -> /api/example -> 외부 API.
// 실제 엔드포인트가 정해지면 경로와 응답 타입을 바꾸고, 필요하면 인증/rate limit을 붙인다.
// 그 외 예외는 다시 던져서 Next.js가 서버 로그에 남기고 상세 없이 500을 응답하게 둔다.
export async function GET() {
  try {
    const data = await callExternalApi<unknown>('/');
    return Response.json(data);
  } catch (error) {
    if (error instanceof ExternalApiError) {
      return Response.json({ error: 'Upstream error' }, { status: 502 });
    }
    throw error;
  }
}
