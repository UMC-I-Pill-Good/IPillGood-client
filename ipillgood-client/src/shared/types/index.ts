import type { CommonResponse } from './api';

export type { CommonResponse } from './api';
export { AGE_GROUP_LABEL, GENDER_LABEL } from './demographics';
export type { AgeGroup, Gender } from './demographics';

export type ApiResponse<T> = Omit<CommonResponse<T>, 'result'> & {
  result: T | null;
};
