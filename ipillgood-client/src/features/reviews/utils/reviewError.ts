import { isAxiosError } from 'axios';

export const getReviewErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (isAxiosError<{ code?: string; message?: string }>(error)) {
    const errorCode = error.response?.data.code;
    const errorMessage = error.response?.data.message;
    const responseMessage = [errorCode, errorMessage].filter(Boolean).join(' ');

    return responseMessage || fallbackMessage;
  }

  return error instanceof Error ? error.message : fallbackMessage;
};
