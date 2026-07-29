import { KakaoIcon, NaverIcon } from '@/assets';

const SocialLoginForm = () => {
  return (
    <>
      <button
        type='button'
        aria-label='카카오 계정으로 로그인'
        className='bg-[#FEE500] h-13 flex items-center justify-center gap-2.5 w-full py-2.5 rounded-lg typo-body-2 transition hover:brightness-95 active:brightness-90 shadow-[0_4px_4px_rgba(126,131,135,0.1)] mb-2.5'
        onClick={() => console.log('로그인 성공')}
      >
        <KakaoIcon />
        카카오 로그인
      </button>
      <button
        type='button'
        aria-label='네이버 계정으로 로그인'
        className='bg-[#05AC4F] h-13 flex items-center justify-center gap-2.5 w-full py-2.5 rounded-lg typo-body-2 text-white transition hover:brightness-95 active:brightness-90 shadow-[0_4px_4px_rgba(126,131,135,0.1)]'
        onClick={() => console.log('로그인 성공')}
      >
        <NaverIcon />
        네이버 로그인
      </button>
    </>
  );
};

export default SocialLoginForm;
