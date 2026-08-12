'use client';

import { baseURL } from '@/app/api/api';
import { KakaoIcon, NaverIcon } from '@/assets';

// 소셜 로그인 이동 경로 정의
const OAUTH_URL = {
  kakao: `${baseURL}/auth/kakao/login`,
  naver: `${baseURL}/auth/naver/login`,
} as const;

type SocialProvider = keyof typeof OAUTH_URL;

const SocialLoginForm = () => {
  const handleSocialLogin = (provider: SocialProvider) => {
    // 1. 포커스 해제 (모바일 아웃라인/버튼 잔상 방지)
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // 2. 소셜 로그인 URL로 이동 (현재 창 리다이렉트)
    window.location.assign(OAUTH_URL[provider]);
  };

  return (
    <>
      <button
        type='button'
        aria-label='카카오 계정으로 로그인'
        className='bg-[#FEE500] h-13 flex items-center justify-center gap-2.5 w-full py-2.5 rounded-lg typo-body-2 transition hover:brightness-95 active:brightness-90 shadow-[0_4px_4px_rgba(126,131,135,0.1)] mb-2.5 cursor-pointer'
        onClick={() => handleSocialLogin('kakao')}
      >
        <KakaoIcon />
        카카오 로그인
      </button>

      <button
        type='button'
        aria-label='네이버 계정으로 로그인'
        className='bg-[#05AC4F] h-13 flex items-center justify-center gap-2.5 w-full py-2.5 rounded-lg typo-body-2 text-white transition hover:brightness-95 active:brightness-90 shadow-[0_4px_4px_rgba(126,131,135,0.1)] cursor-pointer'
        onClick={() => handleSocialLogin('naver')}
      >
        <NaverIcon />
        네이버 로그인
      </button>
    </>
  );
};

export default SocialLoginForm;
