'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { isAdminAccessToken } from '@/shared/utils/authToken';

interface AdminAuthGuardProps {
  children: ReactNode;
}

const AdminAuthGuard = ({ children }: AdminAuthGuardProps) => {
  const router = useRouter();
  const { getAccessToken } = useLocalStorage();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      router.replace('/login');
      return;
    }

    if (!isAdminAccessToken(accessToken)) {
      router.replace('/home');
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAuthorized(true);
  }, [getAccessToken, router]);

  if (!isAuthorized) return null;

  return children;
};

export default AdminAuthGuard;
