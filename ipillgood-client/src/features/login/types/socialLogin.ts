import { CommonResponse } from '@/shared/types';

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
