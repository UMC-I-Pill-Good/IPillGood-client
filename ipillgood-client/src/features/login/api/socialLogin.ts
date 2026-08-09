import { axiosInstance } from '@/app/api/api';
import { ResponseSocialLoginLink } from '../types/socialLogin';

export const postNaverLink = async (body: {
  accountLinkToken: string;
}): Promise<ResponseSocialLoginLink> => {
  const { data } = await axiosInstance.post<ResponseSocialLoginLink>('/auth/naver/link', body);

  return data;
};

export const postKakaoLink = async (body: {
  accountLinkToken: string;
}): Promise<ResponseSocialLoginLink> => {
  const { data } = await axiosInstance.post<ResponseSocialLoginLink>('/auth/kakao/link', body);

  return data;
};
