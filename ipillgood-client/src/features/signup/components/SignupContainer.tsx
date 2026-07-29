'use client';

import Link from 'next/link';
import StepNavigation from './StepNavigation';
import SignupInputStep from './SignupInputStep';
import SignupAgreementStep from './SignupAgreementStep';
import SignupCompleteStep from './SignupCompleteStep';
import SignupSubmitButton from './SignupSubmitButton';
import { useSignupForm } from '../hooks/useSignupForm';
import { StepHeader } from '@/shared/layout';

const SignupContainer = () => {
  const { step, control, register, handleBack, onSubmit } = useSignupForm();

  return (
    <main className='flex min-h-screen flex-col px-5 py-4'>
      {/* 3단계(가입 완료)가 아닐 때만 상단 네비/헤더/폼 노출 */}
      {step !== 3 && (
        <>
          <StepNavigation step={step} onBack={handleBack} />

          <StepHeader
            title={step === 1 ? '회원가입' : '약관 동의'}
            desc={step === 1 ? '기본 정보를 입력해주세요' : '서비스 이용을 위해 동의해주세요'}
          />

          <form onSubmit={onSubmit} className='flex flex-1 flex-col'>
            {step === 1 && <SignupInputStep control={control} register={register} />}
            {step === 2 && <SignupAgreementStep />}

            <SignupSubmitButton step={step} control={control} />
          </form>

          {step === 1 && (
            <div className='text-center'>
              <p className='text-neutral-800'>
                이미 계정이 있으신가요?{' '}
                <Link href='/login' className='text-black transition hover:underline'>
                  로그인
                </Link>
              </p>
            </div>
          )}
        </>
      )}

      {step === 3 && <SignupCompleteStep />}
    </main>
  );
};

export default SignupContainer;
