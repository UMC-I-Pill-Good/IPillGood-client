export type LoginProviderType = 'LOCAL' | 'KAKAO' | 'NAVER';

export type MyUserType = {
  memberId: number;
  nickname: string;
  profileImageUrl: string;
  isPremium: boolean;
  loginProviders: LoginProviderType[];
};
