import { isAxiosError } from 'axios';

interface ConditionErrorResponse {
  code?: string;
  message?: string;
}

export const getConditionErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (isAxiosError<ConditionErrorResponse>(error)) {
    return error.response?.data.message ?? fallbackMessage;
  }

  if (error instanceof Error) {
    return error.message || fallbackMessage;
  }

  return fallbackMessage;
};
