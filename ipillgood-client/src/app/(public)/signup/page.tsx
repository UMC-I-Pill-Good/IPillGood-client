'use client';

import Link from 'next/link';
import { IconButton, Input, TextButton } from '@/shared/components';
import { ChevronLeft } from 'lucide-react';

const SignupPage = () => {
  return (
    <main className='flex min-h-screen flex-col px-5 py-4'>
      <section>
        <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' />

        <div className='flex items-center gap-5 mt-4'>
          <div className='h-1 flex-1 rounded-full bg-primary-500' />
          <div className='h-1 flex-1 rounded-full bg-primary-500' />
        </div>
      </section>

      <section className='py-4.5 space-y-1'>
        <h5 className='text-primary-600 typo-body-1'>회원가입</h5>
        <p className='text-neutral-800 typo-body-11'>기본 정보를 입력해주세요</p>
      </section>

      <section className='py-4 space-y-3'>
        <Input type='text' label='닉네임' placeholder='닉네임을 입력해 주세요' />
        <Input type='email' label='이메일' placeholder='이메일을 입력해 주세요' />

        <div className='flex items-end gap-2'>
          <Input type='id' label='아이디' placeholder='아이디를 입력해 주세요' />

          <TextButton type='button' text='중복 확인' variant='secondary' className='h-10 p-2.5' />
        </div>

        <Input
          type='password'
          label='비밀번호'
          placeholder='영문, 숫자 포함 8자 이상 입력해 주세요'
        />
        <Input type='password' label='비밀번호 확인' placeholder='비밀번호를 다시 입력해 주세요' />
      </section>

      <section className='space-y-2.5 mt-auto'>
        <TextButton type='submit' text='다음' size='xl' className='w-full' />

        <p className='text-neutral-800 text-center'>
          이미 계정이 있으신가요?{' '}
          <Link href='/login' className='text-black transition hover:underline'>
            로그인
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignupPage;
