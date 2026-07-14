'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import mascotImage from '@/assets/images/mascot.png';
import { signupSchema, SignupType } from '@/features/signup/schemas/authSchema';
import { CheckboxButton, IconButton, Input, TextButton } from '@/shared/components';
import { StepHeader } from '@/shared/layout/StepHeader';
import Image from 'next/image';

const inputFields = [
  {
    name: 'nickname',
    label: '닉네임',
    placeholder: '닉네임을 입력해주세요',
    type: 'text',
    isDuplicateCheck: false,
  },
  {
    name: 'id',
    label: '아이디',
    placeholder: '아이디를 입력해주세요',
    type: 'text',
    isDuplicateCheck: true,
  },
  {
    name: 'email',
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
    type: 'email',
    isDuplicateCheck: false,
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '영문, 숫자 포함 8자 이상 입력해주세요',
    type: 'password',
    isDuplicateCheck: false,
  },
  {
    name: 'passwordConfirm',
    label: '비밀번호 확인',
    placeholder: '비밀번호를 다시 입력해주세요',
    type: 'password',
    isDuplicateCheck: false,
  },
] as const;

const agreementLists = [
  {
    id: 'terms',
    label: '서비스 이용약관 동의 (필수)',
    href: '#',
    required: true,
  },
  {
    id: 'privacy',
    label: '개인정보 수집 및 이용 동의 (필수)',
    href: '#',
    required: true,
  },
  {
    id: 'health',
    label: '건강 정보 수집 및 이용 동의 (필수)',
    href: '#',
    required: true,
  },
  {
    id: 'marketing',
    label: '마케팅 정보 수신 동의 (선택)',
    href: '#',
    required: false,
  },
] as const;

const SignupPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [checked, setChecked] = useState({
    all: false,
    terms: false,
    privacy: false,
    health: false,
    marketing: false,
  });

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

  const handleBack = () => {
    if (step === 1) {
      router.back();
      return;
    }

    setStep(1);
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
      <section className={clsx(step === 3 && 'hidden')}>
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

      {step !== 3 && (
        <StepHeader
          title={step === 1 ? '회원가입' : '약관 동의'}
          desc={step === 1 ? '기본 정보를 입력해주세요' : '서비스 이용을 위해 동의해주세요'}
        />
      )}

      {step !== 3 && (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-1 flex-col'>
          {step === 1 && (
            <section className='space-y-3 py-4'>
              {inputFields.map((field) => (
                <div
                  key={field.name}
                  className={clsx('flex gap-2', errors[field.name] ? 'items-center' : 'items-end')}
                >
                  <Input
                    {...register(field.name)}
                    id={field.name}
                    type={field.type}
                    label={field.label}
                    placeholder={field.placeholder}
                    error={errors[field.name]?.message}
                  />
                  {field.isDuplicateCheck && (
                    <TextButton
                      type='button'
                      text='중복 확인'
                      variant='secondary'
                      className='h-10 px-4'
                    />
                  )}
                </div>
              ))}
            </section>
          )}

          {step === 2 && (
            <section className='py-4 space-y-2'>
              <div className='bg-white/50 h-10 p-2.5 rounded-xl glass w-full flex items-center justify-start gap-2'>
                <CheckboxButton checked={checked.all} onClick={handleAllCheck} size='lg' />

                <p className='typo-body-9'>전체 동의합니다</p>
              </div>

              <div className='bg-white/50 glass h-38 p-2.5 w-full rounded-[20px]'>
                <ul className='space-y-3 w-full'>
                  {agreementLists.map(({ id, label, href }) => (
                    <li key={id} className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <CheckboxButton
                          checked={checked[id]}
                          onClick={() => handleCheck(id)}
                          size='sm'
                        />
                        <p className='typo-body-10'>{label}</p>
                      </div>

                      <Link
                        href={href}
                        className='typo-caption-6 flex items-center text-neutral-800 transition hover:brightness-90'
                      >
                        보기
                        <ChevronRight size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <section className='mt-auto space-y-2.5'>
            <TextButton
              type='submit'
              text={step === 1 ? '다음' : '가입 완료'}
              size='xl'
              className='w-full'
              disabled={(step === 1 && !isValid) || (step === 2 && !isRequiredChecked)}
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
      )}

      {step === 3 && (
        <section className='flex flex-1 flex-col items-center justify-center'>
          <div className='flex pt-26 flex-col items-center justify-center'>
            <Image src={mascotImage} alt='마스코트' width={200} height={200} />

            <h3 className='text-primary-500 typo-subtitle-4 pt-28'>회원가입이 완료되었습니다!</h3>
            <p className='text-neutral-700 typo-body-2 pt-4 text-center'>
              아필굿과 함께 <br className='py-3' /> 건강한 루틴을 시작해 보아요!
            </p>
          </div>

          <TextButton
            type='submit'
            text='초기 설문 시작하기'
            size='xl'
            className='w-full mt-auto'
            onClick={() => router.push('/')}
          />
        </section>
      )}
    </main>
  );
};

export default SignupPage;
