import { isAxiosError } from 'axios';

type ReviewErrorResponse = {
  code?: string;
  message?: string;
};

export class ReviewApiError extends Error {
  constructor(
    readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'ReviewApiError';
  }
}

export const getReviewErrorCode = (error: unknown) => {
  if (error instanceof ReviewApiError) return error.code;
  return isAxiosError<ReviewErrorResponse>(error) ? error.response?.data.code : undefined;
};

export const getReviewErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (isAxiosError<ReviewErrorResponse>(error)) {
    const errorCode = error.response?.data.code;
    const errorMessage = error.response?.data.message;
    const responseMessage = [errorCode, errorMessage].filter(Boolean).join(' ');

    return responseMessage || fallbackMessage;
  }

  if (error instanceof ReviewApiError) return `${error.code} ${error.message}`;
  return error instanceof Error ? error.message : fallbackMessage;
};
