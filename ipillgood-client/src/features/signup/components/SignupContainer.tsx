'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupType } from '@/features/signup/schemas/authSchema';
import { TextButton } from '@/shared/components';
import { StepHeader } from '@/shared/layout/StepHeader';
import StepNavigation from './StepNavigation';
import SignupInputStep from './SignupInputStep';
import SignupAgreementStep from './SignupAgreementStep';
import SignupCompleteStep from './SignupCompleteStep';

const SignupContainer = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isIdDuplicated, setIsIdDuplicated] = useState(false);
  const [checked, setChecked] = useState({
    all: false,
    terms: false,
    privacy: false,
    health: false,
    marketing: false,
  });

  const handleBack = () => {
    if (step === 1) {
      router.back();
      return;
    }

    setStep(1);
  };

  const isRequiredChecked = checked.terms && checked.privacy && checked.health;

  const handleAllCheck = () => {
    const next = !checked.all;

    setChecked({
      all: next,
      terms: next,
      privacy: next,
      health: next,
      marketing: next,
    });
  };

  const handleCheck = (key: keyof typeof checked) => {
    const next = {
      ...checked,
      [key]: !checked[key],
    };

    next.all = next.terms && next.privacy && next.health && next.marketing;

    setChecked(next);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      id: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const idValue = useWatch({
    control,
    name: 'id',
  });

  const handleDuplicateCheck = () => {
    if (!idValue.trim()) return;

    // API 호출
    setIsIdDuplicated(true);
  };

  const onSubmit: SubmitHandler<SignupType> = async (data) => {
    try {
      if (step === 1) {
        setStep(2);
        return;
      }

      console.log('회원가입 성공:', data);

      // await signup(data);

      setStep(3);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className='flex min-h-screen flex-col px-5 py-4'>
      {step !== 3 && (
        <>
          <StepNavigation step={step} onBack={handleBack} />
          <StepHeader
            title={step === 1 ? '회원가입' : '약관 동의'}
            desc={step === 1 ? '기본 정보를 입력해주세요' : '서비스 이용을 위해 동의해주세요'}
          />

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-1 flex-col'>
            {step === 1 && (
              <SignupInputStep
                register={register}
                errors={errors}
                idValue={idValue}
                isIdDuplicated={isIdDuplicated}
                onDuplicateCheck={handleDuplicateCheck}
                onIdChange={() => setIsIdDuplicated(false)}
              />
            )}

            {step === 2 && (
              <SignupAgreementStep
                checked={checked}
                onAllCheck={handleAllCheck}
                onCheck={handleCheck}
              />
            )}

            <section className='mt-auto space-y-2.5'>
              <TextButton
                type='submit'
                text={step === 1 ? '다음' : '가입 완료'}
                size='xl'
                className='w-full'
                disabled={
                  (step === 1 && (!isValid || !isIdDuplicated)) ||
                  (step === 2 && !isRequiredChecked)
                }
              />

              <div className=' text-center'>
                {step === 1 && (
                  <p className='text-neutral-800'>
                    이미 계정이 있으신가요?{' '}
                    <Link href='/login' className='text-black transition hover:underline'>
                      로그인
                    </Link>
                  </p>
                )}
              </div>
            </section>
          </form>
        </>
      )}

      {step === 3 && <SignupCompleteStep onRouter={() => router.push('/')} />}
    </main>
  );
};

export default SignupContainer;
