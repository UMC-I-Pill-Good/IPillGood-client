import { baseURL } from '@/app/api/api';
import { KakaoIcon, NaverIcon } from '@/assets';

const OAUTH_URL = {
  kakao: `${baseURL}/auth/kakao/login`,
  naver: `${baseURL}/auth/naver/login`,
};

const blurActiveElement = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

const SocialLoginForm = () => {
  const handleSocialLogin = (url: string) => {
    blurActiveElement();
    window.location.assign(url);
  };

  return (
    <>
      <button
        type='button'
        aria-label='카카오 계정으로 로그인'
        className='bg-[#FEE500] h-13 flex items-center justify-center gap-2.5 w-full py-2.5 rounded-lg typo-body-2 transition hover:brightness-95 active:brightness-90 shadow-[0_4px_4px_rgba(126,131,135,0.1)] mb-2.5'
        onPointerDown={blurActiveElement}
        onClick={() => handleSocialLogin(OAUTH_URL.kakao)}
      >
        <KakaoIcon />
        카카오 로그인
      </button>
      <button
        type='button'
        aria-label='네이버 계정으로 로그인'
        className='bg-[#05AC4F] h-13 flex items-center justify-center gap-2.5 w-full py-2.5 rounded-lg typo-body-2 text-white transition hover:brightness-95 active:brightness-90 shadow-[0_4px_4px_rgba(126,131,135,0.1)]'
        onPointerDown={blurActiveElement}
        onClick={() => handleSocialLogin(OAUTH_URL.naver)}
      >
        <NaverIcon />
        네이버 로그인
      </button>
    </>
  );
};

export default SocialLoginForm;
