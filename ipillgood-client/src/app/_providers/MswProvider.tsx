'use client';

import { ReactNode, useEffect, useState } from 'react';

export const MswProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(process.env.NODE_ENV !== 'development');

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const startWorker = async () => {
      const { rankingMockWorker } = await import(
        '@/features/ranking/mocks/rankingMockBrowser'
      );

      await rankingMockWorker.start({
        onUnhandledRequest: 'bypass',
      });
      setIsReady(true);
    };

    startWorker();
  }, []);

  if (!isReady) return null;

  return children;
};
