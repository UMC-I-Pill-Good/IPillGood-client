import { axiosInstance } from '@/app/api/api';
import {
  ChangePasswordRequestType,
  UpdateProfileRequestType,
  MemberInfoResponseType,
  ProfileUpdatedResponseType,
} from '../types/member.type';

// 내 정보 조회
export const getMyInfo = async () => {
  const { data } = await axiosInstance.get<MemberInfoResponseType>('/members/me');

  return data;
};

// 프로필 수정
export const patchProfile = async (body: UpdateProfileRequestType) => {
  const { data } = await axiosInstance.patch<ProfileUpdatedResponseType>(
    '/members/me/profile',
    body,
  );

  return data;
};

// 비밀번호 변경
export const patchPassword = async (body: ChangePasswordRequestType) => {
  const { data } = await axiosInstance.patch('/members/me/password', body);

  return data;
};

// 회원 탈퇴
export const deleteMember = async () => {
  await axiosInstance.delete('/members/me');
};
