'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

interface AuthRedirectProps {
  type: 'public' | 'protected';
  children: React.ReactNode;
}

const AuthRedirect = ({ type, children }: AuthRedirectProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { getAccessToken } = useLocalStorage();

  useEffect(() => {
    const hasToken = !!getAccessToken();

    // survey는 public에서도 접근 허용
    if (pathname.startsWith('/survey')) return;

    if (type === 'public' && hasToken) {
      router.replace('/home');
    }

    if (type === 'protected' && !hasToken) {
      router.replace('/login');
    }
  }, [pathname, router, type, getAccessToken]);

  return children;
};

export default AuthRedirect;
