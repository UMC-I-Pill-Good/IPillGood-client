export type CommonResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type ResponeReissueResult = CommonResponse<{
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  memberId: number;
  onboardingCompleted: boolean;
}>;
