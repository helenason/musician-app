import 'server-only';

// 서버 전용 환경변수 접근. 클라이언트 컴포넌트에서 import하면 빌드 에러가 난다.
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function hasEnv(name: string): boolean {
  return Boolean(process.env[name]);
}
