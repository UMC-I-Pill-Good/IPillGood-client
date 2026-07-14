'use client';

import Link from 'next/link';
import { IconButton, Input, TextButton } from '@/shared/components';
import { ChevronLeft } from 'lucide-react';
import { StepHeader } from '@/shared/layout/StepHeader';
import { useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleBack = () => {
    if (step === 1) {
      router.back();
      return;
    }

    setStep(1);
  };

  return (
    <main className='flex min-h-screen flex-col px-5 py-4'>
      <section>
        <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' onClick={handleBack} />

        <div className='flex items-center gap-5 mt-4'>
          <div
            className={clsx(
              'h-1 flex-1 rounded-full',
              step === 1 ? 'bg-primary-500' : 'bg-neutral-500',
            )}
          />
          <div
            className={clsx(
              'h-1 flex-1 rounded-full',
              step === 1 ? 'bg-neutral-500' : 'bg-primary-500',
            )}
          />
        </div>
      </section>

      {step === 1 ? (
        <StepHeader title='회원가입' desc='기본 정보를 입력해주세요' />
      ) : (
        <StepHeader title='약관 동의' desc='서비스 이용을 위해 동의해주세요' />
      )}

      <section className='py-4 space-y-3'>
        <Input type='text' label='닉네임' placeholder='닉네임을 입력해주세요' />
        <Input type='email' label='이메일' placeholder='이메일을 입력해주세요' />

        <div className='flex items-end gap-2'>
          <Input type='id' label='아이디' placeholder='아이디를 입력해주세요' />

          <TextButton type='button' text='중복 확인' variant='secondary' className='h-10 p-2.5' />
        </div>

        <Input
          type='password'
          label='비밀번호'
          placeholder='영문, 숫자 포함 8자 이상 입력해주세요'
        />
        <Input type='password' label='비밀번호 확인' placeholder='비밀번호를 다시 입력해주세요' />
      </section>

      <section className='space-y-2.5 mt-auto'>
        <TextButton
          type='submit'
          text={step === 1 ? '다음' : '가입 완료'}
          size='xl'
          className='w-full'
          onClick={() => setStep(2)}
        />

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
