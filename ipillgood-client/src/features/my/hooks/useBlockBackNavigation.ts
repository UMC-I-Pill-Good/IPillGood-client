'use client';

import { useEffect } from 'react';

// 브라우저 뒤로가기(popstate) 감지 시 콜백을 실행해 이동을 가로챈다
export const useBlockBackNavigation = (callback: () => void) => {
  useEffect(() => {
    // 더미 히스토리를 추가해 popstate 이벤트를 감지할 수 있게 함
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      callback();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [callback]);
};
