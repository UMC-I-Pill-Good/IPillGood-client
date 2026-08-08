import { axiosInstance } from '@/app/api/api';
import {
  RequestSignup,
  RequestSocialSignup,
  ResponseSignup,
  ResponseSocialSignup,
} from '../types/signup';

export const postSignup = async (body: RequestSignup): Promise<ResponseSignup> => {
  const { data } = await axiosInstance.post<ResponseSignup>('/auth/signup', body);

  return data;
};

export const postNaverSignup = async (body: RequestSocialSignup): Promise<ResponseSocialSignup> => {
  const { data } = await axiosInstance.post<ResponseSocialSignup>('/auth/naver/signup', body);

  return data;
};

export const postKakaoSignup = async (body: RequestSocialSignup): Promise<ResponseSocialSignup> => {
  const { data } = await axiosInstance.post<ResponseSocialSignup>('/auth/kakao/signup', body);

  return data;
};
