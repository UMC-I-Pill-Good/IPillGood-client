import { CommonResponse } from '@/shared/types';

export type LoginType = {
  id: string;
  password: string;
};

export type RequestLogin = {
  username: string;
  password: string;
};

export type ResponseLogin = CommonResponse<{
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  memberId: number;
  onboardingCompleted: boolean;
}>;
