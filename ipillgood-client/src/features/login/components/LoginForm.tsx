'use client';

import { motion } from 'framer-motion';
import { IdIcon, KakaoIcon, LockIcon, NaverIcon } from '@/assets';
import { TextButton } from '@/shared/components';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();

  const [idValue, setIdValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const isValid = idValue.trim() !== '' && passwordValue.trim() !== '';

  // 로그인 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    console.log({
      id: idValue,
      password: passwordValue,
    });

    // login API 호출
    router.push('/survey');
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.25,
        duration: 1.2,
        ease: 'easeOut',
      }}
      className='mt-auto w-full'
    >
      <form onSubmit={handleSubmit} aria-label='로그인 폼'>
        {/* 아이디 입력 */}
        <div className='relative'>
          <IdIcon aria-hidden='true' className='absolute left-5 top-1/2 -translate-y-1/2' />
          <label htmlFor='login-id' className='sr-only'>
            아이디
          </label>
          <input
            id='login-id'
            type='text'
            className='w-full py-3 border-b border-neutral-500 text-neutral-800 placeholder:text-neutral-700 focus:outline-none typo-body-2 pl-12 pr-5'
            placeholder='아이디'
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
            autoComplete='username'
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className='relative'>
          <LockIcon aria-hidden='true' className='absolute left-5 top-1/2 -translate-y-1/2' />
          <label htmlFor='login-password' className='sr-only'>
            비밀번호
          </label>
          <input
            id='login-password'
            type='password'
            className='w-full py-3 border-b border-neutral-500 text-neutral-800 placeholder:text-neutral-700 focus:outline-none typo-body-2 pl-12 pr-5'
            placeholder='비밀번호'
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            autoComplete='current-password'
          />
        </div>

        <TextButton type='submit' text='로그인' size='xl' className='w-full mt-2.5' />
      </form>

      <div className='my-4 flex items-center gap-2' role='separator' aria-label='소셜 로그인 구분'>
        <div className='bg-neutral-700 h-px flex-1' />
        <span className='text-neutral-700 typo-caption-2'>또는</span>
        <div className='bg-neutral-700 h-px flex-1' />
      </div>

      {/* 소셜 로그인 */}
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

      <Link
        href='/signup'
        className='mt-1.5 block text-center typo-body-10 text-[#58616A] transition hover:underline'
      >
        회원 가입하러 가기
      </Link>
    </motion.section>
  );
};

export default LoginForm;
