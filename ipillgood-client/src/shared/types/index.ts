import type { CommonResponse } from './api';

export type { CommonResponse } from './api';
export * from './demographics';

export type ApiResponse<T> = Omit<CommonResponse<T>, 'result'> & {
  result: T | null;
};
