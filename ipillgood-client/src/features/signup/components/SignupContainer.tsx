'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();

  const step = Number(searchParams.get('step') ?? 1); // 회원가입 단계 (1: 정보 입력, 2: 약관 동의, 3: 가입 완료)

  const [isIdDuplicated, setIsIdDuplicated] = useState(false); // 아이디 중복확인 완료 여부

  // 약관 동의 체크 상태
  const [checked, setChecked] = useState({
    all: false,
    terms: false,
    privacy: false,
    health: false,
    marketing: false,
  });

  // 이전 단계로 이동 (1단계에서는 이전 페이지로 이동)
  const handleBack = () => {
    if (step === 1) {
      router.back();
      return;
    }

    router.push('/signup?step=1');
  };

  // 필수 약관(이용약관/개인정보/건강정보) 모두 동의했는지 여부
  const isRequiredChecked = checked.terms && checked.privacy && checked.health;

  // 전체 동의 토글
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

  // 개별 약관 항목 토글 (하나라도 해제되면 전체 동의도 자동 해제)
  const handleCheck = (key: keyof typeof checked) => {
    const next = {
      ...checked,
      [key]: !checked[key],
    };

    next.all = next.terms && next.privacy && next.health && next.marketing;

    setChecked(next);
  };

  // react-hook-form + zod 스키마 기반 유효성 검사
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

  // 아이디 입력값 실시간 감시
  const idValue = useWatch({
    control,
    name: 'id',
  });

  // 아이디 중복확인 처리
  const handleDuplicateCheck = () => {
    if (!idValue.trim()) return;

    // API 호출
    setIsIdDuplicated(true);
  };

  // 폼 제출 처리: 1단계에서는 다음 단계로만 이동, 2단계에서는 실제 가입 처리
  const handleSignupSubmit: SubmitHandler<SignupType> = async (data) => {
    try {
      if (step === 1) {
        router.push('/signup?step=2');
        return;
      }

      console.log('회원가입 성공:', data);

      // await signup(data);

      router.push('/signup?step=3');
    } catch (err) {
      console.error(err);
    }
  };

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

          <form onSubmit={handleSubmit(handleSignupSubmit)} className='flex flex-1 flex-col'>
            {/* 1단계: 기본 정보 입력 */}
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

            {/* 2단계: 약관 동의 */}
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
            </section>
          </form>
        </>
      )}

      {step === 3 && <SignupCompleteStep onRouter={() => router.push('/survey?step=1')} />}
    </main>
  );
};

export default SignupContainer;
