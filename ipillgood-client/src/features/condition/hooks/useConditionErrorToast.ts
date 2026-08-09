import { useEffect } from 'react';
import { showToast } from '@/shared/utils';
import { getConditionErrorMessage } from '../utils/conditionError';

export const useConditionErrorToast = (
  error: unknown,
  isError: boolean,
  fallbackMessage: string,
) => {
  useEffect(() => {
    if (!isError) return;

    showToast.error(getConditionErrorMessage(error, fallbackMessage));
  }, [error, fallbackMessage, isError]);
};
