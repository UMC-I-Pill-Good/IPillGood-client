import { CommonResponse } from '@/shared/types';

export type PolicyAgreement = {
  policyDocumentId: number;
  agreed: boolean;
};

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

export type ResponseSocialLoginLink = CommonResponse<{
  linked: boolean;
  provider: 'KAKAO' | 'NAVER';
  linkedAt: string;
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  memberId: number;
  onboardingCompleted: boolean;
}>;
