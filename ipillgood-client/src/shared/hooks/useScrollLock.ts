'use client';

import { useEffect } from 'react';

let scrollLockCount = 0;
let previousOverflow = '';

export const useScrollLock = (enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    if (scrollLockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }

    scrollLockCount += 1;

    return () => {
      scrollLockCount -= 1;

      if (scrollLockCount === 0) {
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [enabled]);
};
