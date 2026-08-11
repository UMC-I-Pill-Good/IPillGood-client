'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/shared/hooks';
import { useAgreementStore } from '../stores/useAgreementStore';
import { RequestSocialSignup } from '../types/signup';
import { postKakaoSignup, postNaverSignup } from '../api/signup';
import { showToast } from '@/shared/utils';

type SocialProvider = 'kakao' | 'naver';
type SocialSignupPayload = RequestSocialSignup & { provider: SocialProvider };

export const useSocialSignupMutation = () => {
  const router = useRouter();
  const checked = useAgreementStore((state) => state.checked);
  const { setTokens, setOnboardingCompleted } = useLocalStorage();

  const mutation = useMutation({
    mutationFn: async ({ provider, ...body }: SocialSignupPayload) => {
      const response = provider === 'kakao' ? await postKakaoSignup(body) : await postNaverSignup(body);

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: ({ result }) => {
      const { accessToken, onboardingCompleted } = result;

      setTokens(accessToken);
      setOnboardingCompleted(onboardingCompleted);
      showToast.success('회원가입에 성공했어요.');
      router.push(onboardingCompleted ? '/home' : '/survey?step=1');
    },
    onError: (error) => {
      console.error(error);
      showToast.error('회원가입에 실패했어요. 다시 시도해 주세요.');
      router.push('/login');
    },
    onSettled: () => {
      sessionStorage.removeItem('socialSignupToken');
      sessionStorage.removeItem('provider');
    },
  });

  const submitSocialSignup = () => {
    const socialSignupToken = sessionStorage.getItem('socialSignupToken');
    const provider = sessionStorage.getItem('provider');

    if (!socialSignupToken || (provider !== 'kakao' && provider !== 'naver')) {
      alert('소셜 회원가입 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
      router.push('/login');
      return;
    }

    mutation.mutate({
      provider,
      socialSignupToken,
      policyAgreements: [
        { policyDocumentId: 1, agreed: checked.terms },
        { policyDocumentId: 2, agreed: checked.privacy },
        { policyDocumentId: 3, agreed: checked.health },
        { policyDocumentId: 4, agreed: checked.marketing },
      ],
    });
  };

  return { submitSocialSignup, isPending: mutation.isPending };
};
