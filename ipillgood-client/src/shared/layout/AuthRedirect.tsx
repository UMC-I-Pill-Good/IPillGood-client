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

  const hasToken = !!getAccessToken();

  const shouldSkipAuth = pathname.startsWith('/survey');

  const shouldRedirect =
    !shouldSkipAuth && ((type === 'public' && hasToken) || (type === 'protected' && !hasToken));

  useEffect(() => {
    // survey는 public에서도 접근 허용
    if (shouldSkipAuth) return;

    if (type === 'public' && hasToken) {
      router.replace('/home');
    }

    if (type === 'protected' && !hasToken) {
      router.replace('/login');
    }
  }, [shouldSkipAuth, type, hasToken, router]);

  if (shouldRedirect) {
    return null;
  }

  return children;
};

export default AuthRedirect;
