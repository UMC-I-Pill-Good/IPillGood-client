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
  const { getAccessToken, getOnboardingCompleted } = useLocalStorage();

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const hasToken = !!getAccessToken();
    const onboardingCompleted = getOnboardingCompleted();

    if (pathname.startsWith('/survey')) {
      if (!hasToken) {
        router.replace('/login');
        return;
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsChecked(true);
      return;
    }

    if (type === 'public' && hasToken) {
      router.replace(onboardingCompleted ? '/home' : '/survey?step=1');
      return;
    }

    if (type === 'protected' && !hasToken) {
      router.replace('/login');
      return;
    }

    if (type === 'protected' && !onboardingCompleted) {
      router.replace('/survey?step=1');
      return;
    }

    setIsChecked(true);
  }, [pathname, router, type, getAccessToken, getOnboardingCompleted]);

  if (!isChecked) {
    return null;
  }

  return children;
};

export default AuthRedirect;
