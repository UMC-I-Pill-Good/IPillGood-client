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
