'use client';

import { useEffect, useState } from 'react';
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

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const hasToken = !!getAccessToken();

    if (pathname.startsWith('/survey')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsChecked(true);
      return;
    }

    if (type === 'public' && hasToken) {
      router.replace('/home');
      return;
    }

    if (type === 'protected' && !hasToken) {
      router.replace('/login');
      return;
    }

    setIsChecked(true);
  }, [pathname, router, type, getAccessToken]);

  if (!isChecked) {
    return null;
  }

  return children;
};

export default AuthRedirect;
