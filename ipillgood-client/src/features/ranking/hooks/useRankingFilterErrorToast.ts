import { useEffect, useRef } from 'react';

import { TOAST_MESSAGES } from '@/shared/constants/toastMessages';
import { showToast } from '@/shared/utils';

interface UseRankingFilterErrorToastParams {
  isLoading: boolean;
  errorMessage: string | null;
}

export const useRankingFilterErrorToast = ({
  isLoading,
  errorMessage,
}: UseRankingFilterErrorToastParams) => {
  const shouldNotifyRef = useRef(false);

  useEffect(() => {
    if (!shouldNotifyRef.current || isLoading) return;

    if (errorMessage) {
      showToast.error(TOAST_MESSAGES.SEARCH_FETCH_FAILED);
    }

    shouldNotifyRef.current = false;
  }, [errorMessage, isLoading]);

  return () => {
    shouldNotifyRef.current = true;
  };
};
