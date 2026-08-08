'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useLocalStorage } from '@/shared/hooks';
import { postKakaoLink, postNaverLink } from '../api/socialLogin';
import SocialLoginForm from './SocialLoginForm';
import LoginForm from './LoginForm';
import LinkConnectionModal from './modal/LinkConnectionModal';

const LoginSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTokens, setOnboardingCompleted } = useLocalStorage();
  const isLinkModalOpen = searchParams.get('accountLink') === 'true';

  const linkMutation = useMutation({
    mutationFn: async ({
      accountLinkToken,
      provider,
    }: {
      accountLinkToken: string;
      provider: 'kakao' | 'naver';
    }) => {
      const response =
        provider === 'kakao'
          ? await postKakaoLink({ accountLinkToken })
          : await postNaverLink({ accountLinkToken });

      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      return response;
    },
    onSuccess: ({ result }) => {
      sessionStorage.removeItem('accountLinkToken');
      sessionStorage.removeItem('accountLinkProvider');
      setTokens(result.accessToken);
      setOnboardingCompleted(result.onboardingCompleted);
      router.replace(result.onboardingCompleted ? '/home' : '/survey?step=1');
    },
    onError: (error) => {
      console.error('소셜 계정 연동 실패:', error);
      alert('계정 연동에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleLinkConfirm = () => {
    const accountLinkToken = sessionStorage.getItem('accountLinkToken');
    const provider = sessionStorage.getItem('accountLinkProvider');

    if (!accountLinkToken || (provider !== 'kakao' && provider !== 'naver')) {
      alert('계정 연동 정보를 찾을 수 없습니다. 소셜 로그인을 다시 시도해주세요.');
      router.replace('/login');
      return;
    }

    linkMutation.mutate({ accountLinkToken, provider });
  };

  const handleLinkCancel = () => {
    sessionStorage.removeItem('accountLinkToken');
    sessionStorage.removeItem('accountLinkProvider');
    router.replace('/login');
  };

  return (
    <>
      <motion.section
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.25,
          duration: 1.2,
          ease: 'easeOut',
        }}
        className='mt-auto w-full'
      >
        {/* 로컬 로그인 */}
        <LoginForm />

        <div
          className='my-4 flex items-center gap-2'
          role='separator'
          aria-label='소셜 로그인 구분'
        >
          <div className='bg-neutral-700 h-px flex-1' />
          <span className='text-neutral-700 typo-caption-2'>또는</span>
          <div className='bg-neutral-700 h-px flex-1' />
        </div>

        {/* 소셜 로그인 */}
        <SocialLoginForm />

        <Link
          href='/signup'
          className='mt-1.5 block text-center typo-body-10 text-[#58616A] transition hover:underline'
        >
          회원 가입하러 가기
        </Link>
      </motion.section>

      {isLinkModalOpen && (
        <LinkConnectionModal
          onConfirm={handleLinkConfirm}
          onCancel={handleLinkCancel}
          isPending={linkMutation.isPending}
        />
      )}
    </>
  );
};

export default LoginSection;
