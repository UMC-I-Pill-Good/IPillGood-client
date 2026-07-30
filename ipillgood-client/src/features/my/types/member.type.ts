import { CommonResponse } from '@/shared/types';
import z from 'zod';
import { passwordSchema } from '../schemas/passwordSchema';

type LoginProviderType = 'LOCAL' | 'KAKAO' | 'NAVER';

export type MemberInfoType = {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  loginProviders: LoginProviderType[];
  onboardingCompleted: boolean;
};

export type MemberInfoResponseType = CommonResponse<MemberInfoType>;

export type UpdateProfileRequestType = {
  nickname: string;
};

export type ProfileUpdatedType = {
  memberId: number;
  nickname: string;
};

export type ProfileUpdatedResponseType = CommonResponse<ProfileUpdatedType>;

export type ChangePasswordRequestType = z.infer<typeof passwordSchema>;
