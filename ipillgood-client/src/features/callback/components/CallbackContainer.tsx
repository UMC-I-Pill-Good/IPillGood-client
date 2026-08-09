'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { postReissue } from '@/app/api/reissue';
import { useLocalStorage } from '@/shared/hooks';
import CallbackLoading from '@/app/(public)/callback/ui/CallbackLoading';

const CallbackContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTokens, setOnboardingCompleted } = useLocalStorage();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) {
      return;
    }

    hasProcessed.current = true;

    const socialSignupToken = searchParams.get('socialSignupToken');
    const accountLinkToken = searchParams.get('accountLinkToken');
    const provider = searchParams.get('provider');

    if (socialSignupToken && provider) {
      sessionStorage.setItem('socialSignupToken', socialSignupToken);
      sessionStorage.setItem('provider', provider);

      router.replace('/signup/social');
      return;
    }

    // 임시 토큰은 세션 스토리지 활용
    if (accountLinkToken && (provider === 'kakao' || provider === 'naver')) {
      sessionStorage.setItem('accountLinkToken', accountLinkToken);
      sessionStorage.setItem('accountLinkProvider', provider);
      router.replace('/login?accountLink=true');
      return;
    }

    const reissueAccessToken = async () => {
      try {
        const data = await postReissue();

        if (!data.isSuccess) {
          throw new Error(data.message);
        }

        const { accessToken, onboardingCompleted } = data.result;

        setTokens(accessToken);
        setOnboardingCompleted(onboardingCompleted);
        router.replace(onboardingCompleted ? '/home' : '/survey?step=1');
      } catch (error) {
        console.error('소셜 로그인 토큰 재발급 실패:', error);
        router.replace('/login');
      }
    };

    void reissueAccessToken();
  }, [router, searchParams, setOnboardingCompleted, setTokens]);

  return <CallbackLoading />;
};

export default CallbackContainer;
