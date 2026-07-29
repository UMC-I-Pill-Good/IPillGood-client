import { axiosInstance } from '@/app/api/api';
import { RequsestSignup, ResponseSignup } from '../types/signup';

export const postSignup = async (body: RequsestSignup): Promise<ResponseSignup> => {
  const { data } = await axiosInstance.post('/auth/signup', body);

  return data;
};
