'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema, SignupType } from '@/features/signup/schemas/authSchema';
import { IconButton, Input, TextButton } from '@/shared/components';
import { StepHeader } from '@/shared/layout/StepHeader';

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

const SignupPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

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

      router.push('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className='flex min-h-screen flex-col px-5 py-4  line-clamp-1'>
      <section>
        <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' onClick={handleBack} />

        <div className='mt-4 flex items-center gap-5'>
          {[1, 2].map((index) => (
            <div
              key={index}
              className={clsx(
                'h-1 flex-1 rounded-full',
                step >= index ? 'bg-primary-500' : 'bg-neutral-500',
              )}
            />
          ))}
        </div>
      </section>

      <StepHeader
        title={step === 1 ? '회원가입' : '약관 동의'}
        desc={step === 1 ? '기본 정보를 입력해주세요' : '서비스 이용을 위해 동의해주세요'}
      />

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-1 flex-col'>
        {step === 1 && (
          <section className='space-y-3 py-4'>
            {inputFields.map((field) => (
              <div key={field.name} className='flex items-end gap-2'>
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

        {step === 2 && <section className='py-4'>{/* 약관 동의 UI */}</section>}

        <section className='mt-auto space-y-2.5'>
          <TextButton
            type='submit'
            text={step === 1 ? '다음' : '가입 완료'}
            size='xl'
            className='w-full'
            disabled={step === 1 && !isValid}
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
    </main>
  );
};

export default SignupPage;
