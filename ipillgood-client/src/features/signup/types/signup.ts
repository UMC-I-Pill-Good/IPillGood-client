import { CommonResponse } from '@/shared/types';

export type PolicyAgreement = {
  policyDocumentId: number;
  agreed: boolean;
};

export type RequestSignup = {
  nickname: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  policyAgreements: PolicyAgreement[];
};

export type ResponseSignup = CommonResponse<{
  memberId: number;
  nickname: string;
  username: string;
  email: string;
  profileImageUrl: string;
  onboardingCompleted: boolean;
  createdAt: string;
}>;

export type RequestSocialSignup = {
  socialSignupToken: string;
  policyAgreements: PolicyAgreement[];
};

export type ResponseSocialSignup = CommonResponse<{
  memberId: number;
  provider: 'KAKAO' | 'NAVER';
  nickname: string;
  email: string;
  profileImageUrl: string;
  onboardingCompleted: boolean;
  createdAt: string;
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}>;
