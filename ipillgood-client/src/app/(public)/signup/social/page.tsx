'use client';

import { type FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { StepHeader } from '@/shared/layout';
import { IconButton, TextButton } from '@/shared/components';
import SignupAgreementStep from '@/features/signup/components/SignupAgreementStep';
import {
  useAgreementStore,
  useIsRequiredChecked,
} from '@/features/signup/stores/useAgreementStore';
import { postKakaoSignup } from '@/features/login/api/social-login';
import { type RequestSocialSignup } from '@/features/login/types/social-login';
import { ChevronLeft } from 'lucide-react';
import { useLocalStorage } from '@/shared/hooks';

const SocialAgreementPage = () => {
  const router = useRouter();
  const isRequiredChecked = useIsRequiredChecked();
  const checked = useAgreementStore((state) => state.checked);
  const { setTokens } = useLocalStorage();

  const socialSignupMutation = useMutation({
    mutationFn: async (body: RequestSocialSignup) => {
      const response = await postKakaoSignup(body);

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: ({ result }) => {
      const { accessToken, onboardingCompleted } = result;

      setTokens(accessToken);

      if (onboardingCompleted) {
        router.push('/home');
      } else {
        router.push('/survey?step=1');
      }
    },
    onError: (error) => {
      console.error(error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      router.push('/login');
    },
    onSettled: () => {
      localStorage.removeItem('socialSignupToken');
      localStorage.removeItem('provider');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const socialSignupToken = localStorage.getItem('socialSignupToken');
    const provider = localStorage.getItem('provider');

    if (!socialSignupToken || provider !== 'kakao') {
      alert('카카오 회원가입 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
      router.push('/login');
      return;
    }

    socialSignupMutation.mutate({
      socialSignupToken,
      policyAgreements: [
        { policyDocumentId: 1, agreed: checked.terms },
        { policyDocumentId: 2, agreed: checked.privacy },
        { policyDocumentId: 3, agreed: checked.health },
        { policyDocumentId: 4, agreed: checked.marketing },
      ],
    });
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
          disabled={!isRequiredChecked || socialSignupMutation.isPending}
        />
      </form>
    </main>
  );
};

export default SocialAgreementPage;
