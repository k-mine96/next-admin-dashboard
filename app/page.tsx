'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // 인증 상태에 따라 리다이렉트
    // (Middleware에서도 처리하지만, 클라이언트 사이드에서도 처리)
    if (isAuthenticated) {
      router.push('/dashboard/overview');
    } else {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  // 리다이렉트 중 로딩 표시
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh' 
    }}>
      <p>로딩 중...</p>
    </div>
  );
}
