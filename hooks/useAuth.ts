import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth() {
  const { user, accessToken, isAuthenticated, setUser, setAccessToken, logout } =
    useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청 (선택사항)
      // await fetch('/api/auth/logout', { method: 'POST' });
      
      // 로컬 상태 초기화
      logout();
      
      // 쿠키 삭제를 위한 리다이렉트
      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      // 에러가 발생해도 로컬 상태는 초기화
      logout();
      router.push('/auth/login');
    }
  };

  return {
    user,
    accessToken,
    isAuthenticated,
    setUser,
    setAccessToken,
    logout: handleLogout,
  };
}
