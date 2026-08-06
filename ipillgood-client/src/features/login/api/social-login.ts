import { axiosInstance } from '@/app/api/api';
import {
  RequestSocialSignup,
  ResponseSocialLoginLink,
  ResponseSocialSignup,
} from '../types/social-login';

export const postNaverSignup = async (body: RequestSocialSignup): Promise<ResponseSocialSignup> => {
  const { data } = await axiosInstance.post<ResponseSocialSignup>('/auth/naver/signup', body);

  return data;
};

export const postKakaoSignup = async (body: RequestSocialSignup): Promise<ResponseSocialSignup> => {
  const { data } = await axiosInstance.post<ResponseSocialSignup>('/auth/kakao/signup', body);

  return data;
};

export const postNaverLink = async (
  body: RequestSocialSignup,
): Promise<ResponseSocialLoginLink> => {
  const { data } = await axiosInstance.post<ResponseSocialLoginLink>('/auth/naver/link', body);

  return data;
};

export const postKakaoLink = async (
  body: RequestSocialSignup,
): Promise<ResponseSocialLoginLink> => {
  const { data } = await axiosInstance.post<ResponseSocialLoginLink>('/auth/kakao/link', body);

  return data;
};
