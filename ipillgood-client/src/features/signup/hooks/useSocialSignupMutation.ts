'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/shared/hooks';
import { useAgreementStore } from '../stores/useAgreementStore';
import { RequestSocialSignup } from '../types/signup';
import { postKakaoSignup } from '../api/signup';

export const useSocialSignupMutation = () => {
  const router = useRouter();
  const checked = useAgreementStore((state) => state.checked);
  const { setTokens, setOnboardingCompleted } = useLocalStorage();

  const mutation = useMutation({
    mutationFn: async (body: RequestSocialSignup) => {
      const response = await postKakaoSignup(body);

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: ({ result }) => {
      const { accessToken, onboardingCompleted } = result;

      setTokens(accessToken);
      setOnboardingCompleted(onboardingCompleted);
      router.push(onboardingCompleted ? '/home' : '/survey?step=1');
    },
    onError: (error) => {
      console.error(error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
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

    if (!socialSignupToken || provider !== 'kakao') {
      alert('카카오 회원가입 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
      router.push('/login');
      return;
    }

    mutation.mutate({
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
