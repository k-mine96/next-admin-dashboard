import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './jwt';

/**
 * API Route에서 사용할 인증 미들웨어
 */
export function authenticateRequest(request: NextRequest): {
  user: { userId: string; email: string; role: string } | null;
  error: NextResponse | null;
} {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      user: null,
      error: NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: '인증 토큰이 필요합니다.',
          },
        },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.substring(7); // "Bearer " 제거

  try {
    const payload = verifyToken(token);
    return {
      user: {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      },
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: '유효하지 않은 토큰입니다.',
          },
        },
        { status: 401 }
      ),
    };
  }
}

/**
 * 권한 체크 미들웨어
 */
export function requireRole(
  userRole: string,
  allowedRoles: string[]
): NextResponse | null {
  if (!allowedRoles.includes(userRole)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: '접근 권한이 없습니다.',
        },
      },
      { status: 403 }
    );
  }
  return null;
}
