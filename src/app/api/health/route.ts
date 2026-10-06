import { hasEnv } from '@/lib/server/env';

export const dynamic = 'force-dynamic';

// 배포 확인용. 키 값은 절대 응답에 넣지 않고 설정 여부만 노출한다.
export function GET() {
  return Response.json({
    status: 'ok',
    externalApiConfigured: hasEnv('EXTERNAL_API_BASE_URL') && hasEnv('EXTERNAL_API_KEY'),
  });
}
