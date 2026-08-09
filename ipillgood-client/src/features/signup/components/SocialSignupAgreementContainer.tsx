'use client';

import { type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { StepHeader } from '@/shared/layout';
import { IconButton, TextButton } from '@/shared/components';
import SignupAgreementStep from './SignupAgreementStep';
import { useIsRequiredChecked } from '../stores/useAgreementStore';
import { ChevronLeft } from 'lucide-react';
import { useSocialSignupMutation } from '../hooks/useSocialSignupMutation';

const SocialSignupAgreementContainer = () => {
  const router = useRouter();
  const isRequiredChecked = useIsRequiredChecked();
  const { submitSocialSignup, isPending } = useSocialSignupMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitSocialSignup();
  };

  return (
    <main className='flex min-h-screen flex-col px-5 py-4'>
      <IconButton
        icon={<ChevronLeft size={26} />}
        ariaLabel='뒤로 가기'
        onClick={() => router.back()}
      />

      <StepHeader title='약관 동의' desc='서비스 이용을 위해 동의해주세요' />

      <form onSubmit={handleSubmit} className='flex flex-1 flex-col'>
        <SignupAgreementStep />

        <TextButton
          type='submit'
          text='가입 완료'
          size='xl'
          className='w-full mt-auto mb-2.5'
          disabled={!isRequiredChecked || isPending}
        />
      </form>
    </main>
  );
};

export default SocialSignupAgreementContainer;
