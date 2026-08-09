import { ResponeReissueResult } from '@/shared/types/api';
import { axiosInstance } from './api';

export const postReissue = async (): Promise<ResponeReissueResult> => {
  const { data } = await axiosInstance.post<ResponeReissueResult>('/auth/reissue');

  return data;
};
