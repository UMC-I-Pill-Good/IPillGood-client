import { IdIcon, KakaoIcon, LockIcon, LogoIcon, NaverIcon } from '@/assets';
import { TextButton } from '@/shared/components';
import { Tilt_Warp } from 'next/font/google';
import Link from 'next/link';

const tiltWarp = Tilt_Warp({
  subsets: ['latin'],
  weight: '400',
});

const LoginPage = () => {
  return (
    <main className='relative isolate p-5 flex flex-col h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#a4befa_0%,#F2F6FF_50%)]'>
      {/* Background */}
      <div
        className='bg-blur absolute top-22 -right-20 h-52 w-52'
        style={{
          background: 'rgba(205, 160, 255,.5)',
          filter: 'blur(70px)',
        }}
      />

      <div
        className='bg-blur absolute -left-22.5 top-75 h-[319.48px] w-[386.21px] rotate-[-26.62deg]'
        style={{
          background: 'rgba(192, 182, 255,.5)',
          filter: 'blur(90px)',
        }}
      />

      {/* Capsule */}
      <div
        className='absolute top-4 left-15 h-[30.73px] w-[114.36px] rotate-[-45.94deg] rounded-full border-y border-white/30'
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(155,161,255,.2), inset 0 4px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      <div
        className='absolute top-25 right-22 h-[30.73px] w-[50.03px] rotate-[56.71deg] rounded-full border-x border-white/30'
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(155,161,255,.2), inset 2px 2px 4px rgba(255,255,255,.4), 2px 2px 4px rgba(155,161,255,.2)',
        }}
      />

      {/* Content */}
      <section className='relative z-10 flex flex-col items-center justify-center mt-12'>
        <p className='typo-body-1 text-primary-500'>나에게 맞는 영양제 추천</p>

        <div className='flex items-center justify-center pt-18'>
          <LogoIcon width='245' height='233' />
          <h1
            className={`${tiltWarp.className} absolute text-[50px] font-bold text-white whitespace-nowrap [text-shadow:4px_4px_4px_rgba(0,0,0,0.2),8px_2px_40px_rgba(52,116,255,0.4)]`}
          >
            I Pill Good
          </h1>
        </div>
      </section>

      <section className='mt-auto w-full'>
        <form>
          <div className='relative'>
            <IdIcon size={20} className='absolute left-5 top-1/2 -translate-y-1/2' />
            <input
              type='text'
              className='w-full py-3 border-b border-neutral-700 text-neutral-800 placeholder:text-neutral-700 focus:outline-none typo-body-2 pl-12 pr-5'
              placeholder='아이디'
            />
          </div>

          <div className='relative'>
            <LockIcon size={20} className='absolute left-5 top-1/2 -translate-y-1/2' />
            <input
              type='password'
              className='w-full py-3 border-b border-neutral-700 text-neutral-800 placeholder:text-neutral-700 focus:outline-none typo-body-2 pl-12 pr-5'
              placeholder='비밀번호'
            />
          </div>

          <TextButton type='submit' text='로그인' size='xl' className='w-full mt-2.5' />
        </form>

        <div className='my-4 flex items-center gap-2'>
          <div className='bg-neutral-700 h-px flex-1' />
          <span className='text-neutral-700 typo-caption-2'>또는</span>
          <div className='bg-neutral-700 h-px flex-1' />
        </div>

        <button
          type='button'
          className='bg-[#FEE500] h-13 flex items-center justify-center gap-2.5 w-full py-2.5 rounded-lg typo-body-2 transition hover:brightness-95 active:brightness-90 shadow-[0_4px_4px_rgba(126,131,135,0.1)] mb-2.5'
        >
          <KakaoIcon />
          카카오 로그인
        </button>
        <button
          type='button'
          className='bg-[#05AC4F] h-13 flex items-center justify-center gap-2.5 w-full py-2.5 rounded-lg typo-body-2 text-white transition hover:brightness-95 active:brightness-90 shadow-[0_4px_4px_rgba(126,131,135,0.1)]'
        >
          <NaverIcon />
          네이버 로그인
        </button>

        <Link
          href='/signup'
          className='mt-1.5 block text-center typo-body-10 text-[#58616A] transition hover:underline'
        >
          회원 가입하러 가기
        </Link>
      </section>
    </main>
  );
};

export default LoginPage;
