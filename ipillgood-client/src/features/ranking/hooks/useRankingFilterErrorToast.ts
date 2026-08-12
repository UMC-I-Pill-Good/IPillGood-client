import { useCallback, useEffect, useRef, useState } from 'react';

import { TOAST_MESSAGES } from '@/shared/constants/toastMessages';
import { showToast } from '@/shared/utils';

interface UseRankingFilterErrorToastParams {
  isFetching: boolean;
  errorMessage: string | null;
}

export const useRankingFilterErrorToast = ({
  isFetching,
  errorMessage,
}: UseRankingFilterErrorToastParams) => {
  const shouldNotifyRef = useRef(false);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    if (!shouldNotifyRef.current || isFetching) return;

    if (errorMessage) {
      showToast.error(TOAST_MESSAGES.SEARCH_FETCH_FAILED);
    }

    shouldNotifyRef.current = false;
  }, [errorMessage, isFetching, requestId]);

  return useCallback(() => {
    shouldNotifyRef.current = true;
    setRequestId((currentRequestId) => currentRequestId + 1);
  }, []);
};
