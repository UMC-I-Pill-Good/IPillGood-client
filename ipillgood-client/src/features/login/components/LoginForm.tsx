'use client';

import { IdIcon, LockIcon } from '@/assets';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { postLogin } from '../api/login';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { TextButton } from '@/shared/components';

const LoginForm = () => {
  const router = useRouter();
  const { setTokens } = useLocalStorage();

  const [idValue, setIdValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const isValid = idValue.trim() !== '' && passwordValue.trim() !== '';

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: ({ result }) => {
      const { accessToken, refreshToken, onboardingCompleted } = result;

      setTokens(accessToken, refreshToken);

      if (onboardingCompleted) {
        router.push('/home');
      } else {
        router.push('/survey?step=1');
      }
    },
    onError: (error) => {
      console.error('로그인 실패:', error instanceof Error ? error.message : '알 수 없는 오류');
      alert('아이디 또는 비밀번호를 확인해주세요.');
    },
  });

  // 로그인 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    loginMutation.mutate({
      username: idValue,
      password: passwordValue,
    });
  };

  return (
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
  );
};

export default LoginForm;
