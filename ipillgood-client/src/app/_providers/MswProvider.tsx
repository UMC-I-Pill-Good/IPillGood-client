'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export const MswProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(process.env.NODE_ENV !== 'development');

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    let isMounted = true;

    const startWorker = async () => {
      try {
        const { rankingMockWorker } = await import('@/features/ranking/mocks/rankingMockBrowser');
        await rankingMockWorker.start({
          onUnhandledRequest: 'bypass',
        });
      } catch (error) {
        console.error('Failed to start MSW worker', error);
      } finally {
        if (isMounted) setIsReady(true);
      }
    };

    void startWorker();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isReady) return null;

  return children;
};
