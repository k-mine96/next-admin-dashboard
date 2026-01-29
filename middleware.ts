import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refreshToken');

  // 루트 경로 처리
  if (pathname === '/') {
    if (refreshToken) {
      // 인증된 사용자는 대시보드로 리다이렉트
      return NextResponse.redirect(new URL('/dashboard/overview', request.url));
    } else {
      // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // 인증이 필요한 경로
  if (pathname.startsWith('/dashboard')) {
    if (!refreshToken) {
      // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // 인증된 사용자가 auth 페이지 접근 시
  if (pathname.startsWith('/auth')) {
    if (refreshToken) {
      // 이미 로그인한 사용자는 대시보드로 리다이렉트
      return NextResponse.redirect(new URL('/dashboard/overview', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
