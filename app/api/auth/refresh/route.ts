import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma/client';
import { verifyToken, generateAccessToken } from '@/lib/auth/jwt';
import type { ApiResponse } from '@/types/api';
import type { AuthResponse } from '@/types/auth';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Refresh Token이 없습니다.',
          },
        },
        { status: 401 }
      );
    }

    // Refresh Token 검증
    let payload;
    try {
      payload = verifyToken(refreshToken);
    } catch (error) {
      // Refresh Token이 만료된 경우
      const response = NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Refresh Token이 만료되었습니다.',
          },
        },
        { status: 401 }
      );

      // 쿠키 삭제
      response.cookies.delete('refreshToken');
      return response;
    }

    // 사용자 조회
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.status !== 'ACTIVE') {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: '유효하지 않은 사용자입니다.',
          },
        },
        { status: 401 }
      );
    }

    // 새로운 Access Token 생성
    const newAccessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    });

    return NextResponse.json<ApiResponse<AuthResponse>>(
      {
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            status: user.status,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
          },
          accessToken: newAccessToken,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '서버 오류가 발생했습니다.',
        },
      },
      { status: 500 }
    );
  }
}
