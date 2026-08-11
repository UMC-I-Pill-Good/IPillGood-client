'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/shared/hooks';
import { postKakaoLink, postNaverLink } from '../api/socialLogin';
import { showToast } from '@/shared/utils';

type SocialProvider = 'kakao' | 'naver';

export const useSocialAccountLinkMutation = () => {
  const router = useRouter();
  const { setTokens, setOnboardingCompleted } = useLocalStorage();

  const mutation = useMutation({
    mutationFn: async ({
      accountLinkToken,
      provider,
    }: {
      accountLinkToken: string;
      provider: SocialProvider;
    }) => {
      const response =
        provider === 'kakao'
          ? await postKakaoLink({ accountLinkToken })
          : await postNaverLink({ accountLinkToken });

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: ({ result }) => {
      sessionStorage.removeItem('accountLinkToken');
      sessionStorage.removeItem('accountLinkProvider');
      setTokens(result.accessToken);
      setOnboardingCompleted(result.onboardingCompleted);
      showToast.success('계정이 연동됐어요!');
      router.replace(result.onboardingCompleted ? '/home' : '/survey?step=1');
    },
    onError: () => {
      showToast.error('계정 연동에 실패했어요. 다시 시도해 주세요.');
    },
  });

  const submitAccountLink = () => {
    const accountLinkToken = sessionStorage.getItem('accountLinkToken');
    const provider = sessionStorage.getItem('accountLinkProvider');

    if (!accountLinkToken || (provider !== 'kakao' && provider !== 'naver')) {
      alert('계정 연동 정보를 찾을 수 없습니다. 소셜 로그인을 다시 시도해주세요.');
      router.replace('/login');
      return;
    }

    mutation.mutate({ accountLinkToken, provider });
  };

  const cancelAccountLink = () => {
    sessionStorage.removeItem('accountLinkToken');
    sessionStorage.removeItem('accountLinkProvider');
    router.replace('/login');
  };

  return {
    submitAccountLink,
    cancelAccountLink,
    isPending: mutation.isPending,
  };
};
