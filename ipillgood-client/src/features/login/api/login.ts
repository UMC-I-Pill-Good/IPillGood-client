import { axiosInstance } from '@/app/api/api';
import { RequestLogin, ResponseLogin } from '../types/login';

export const postLogin = async (body: RequestLogin): Promise<ResponseLogin> => {
  const { data } = await axiosInstance.post('/auth/login', body);

  return data;
};
