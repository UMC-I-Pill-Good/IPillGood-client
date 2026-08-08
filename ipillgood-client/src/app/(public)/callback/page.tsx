'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { postReissue } from '@/app/api/reissue';
import { useLocalStorage } from '@/shared/hooks';

const CallbackPage = () => {
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

  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-5'>
      <div className='w-24 h-24 border-6 border-primary border-t-transparent rounded-full animate-spin' />

      <p className='text-[#6D7280] font-medium text-lg'>로그인 처리 중...</p>
    </main>
  );
};

export default CallbackPage;
