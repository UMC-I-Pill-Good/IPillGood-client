import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import axios, { type InternalAxiosRequestConfig } from 'axios';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<void> | null = null;

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  console.error(
    '[axiosInstance] NEXT_PUBLIC_API_URL 이 설정되어 있지 않습니다. .env.local 을 확인하세요.',
  );
}

// 인스턴스 정의
export const axiosInstance = axios.create({
  baseURL,
});

// 요청 인터셉터 : 모든 요청 전에 accessToken을 Authozation 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const { getAccessToken } = useLocalStorage();
    const accessToken = getAccessToken();

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error('request 실패', error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터 : 401에러 발생 -> refresh토큰을 통한 토큰 갱신
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error', error);
    const request: CustomInternalAxiosRequestConfig = error.config;

    if (!request) {
      return Promise.reject(error);
    }

    // reissue 자체 실패는 바로 로그인
    if (request.url?.includes('/auth/reissue')) {
      const { clearTokens } = useLocalStorage();

      clearTokens();

      window.location.href = '/login';

      return Promise.reject(error);
    }

    // access token 만료
    if (error.response?.status === 401 && !request._retry) {
      request._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const { setTokens, getRefreshToken } = useLocalStorage();
            const refreshToken = getRefreshToken();

            if (!refreshToken) {
              throw new Error('저장된 refreshToken이 없습니다.');
            }

            // 기본 axios 사용 (인터셉터 방지)
            const response = await axios.post(`${baseURL}/auth/reissue`, {
              refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = response.data.result;

            setTokens(accessToken, newRefreshToken);
          } catch (err) {
            console.error('토큰 재발급 실패', err);

            const { clearTokens } = useLocalStorage();

            clearTokens();

            window.location.href = '/login';

            throw err;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      try {
        await refreshPromise;

        // 재발급된 새 accessToken을 재요청 헤더에 반영
        const { getAccessToken } = useLocalStorage();
        const newAccessToken = getAccessToken();
        if (newAccessToken && request.headers) {
          request.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return axiosInstance(request);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
