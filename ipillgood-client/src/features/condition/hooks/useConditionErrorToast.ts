import { useEffect } from 'react';
import { showToast } from '@/shared/utils';
import { getConditionErrorMessage } from '../utils/conditionError';

export const useConditionErrorToast = (
  error: unknown,
  isError: boolean,
  fallbackMessage: string,
  isFixedMessage = false,
) => {
  useEffect(() => {
    if (!isError) return;

    showToast.error(
      isFixedMessage ? fallbackMessage : getConditionErrorMessage(error, fallbackMessage),
    );
  }, [error, fallbackMessage, isError, isFixedMessage]);
};
