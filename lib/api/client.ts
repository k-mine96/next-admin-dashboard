import axios from 'axios';
import type { ApiResponse } from '@/types/api';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Refresh Token을 위한 cookie 전송
});

// Request interceptor: Access Token 추가
apiClient.interceptors.request.use(
  (config) => {
    // Access Token은 클라이언트에서 관리 (Zustand store에서 가져옴)
    // 여기서는 기본 구조만 제공
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: 에러 처리 및 토큰 재발급
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 시 토큰 재발급 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh Token으로 새 Access Token 발급
        await apiClient.post('/api/auth/refresh');
        // 원래 요청 재시도
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh Token도 만료된 경우 로그아웃 처리
        // Zustand store의 logout 함수 호출
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
