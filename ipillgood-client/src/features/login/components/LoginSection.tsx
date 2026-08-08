'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSignupDraftStore } from '@/features/signup/stores/useSignupDraftStore';
import { useAgreementStore } from '@/features/signup/stores/useAgreementStore';
import SocialLoginForm from './SocialLoginForm';
import LoginForm from './LoginForm';
import LinkConnectionModal from './modal/LinkConnectionModal';
import { useSocialAccountLinkMutation } from '../hooks/useSocialAccountLinkMutation';

const LoginSection = () => {
  const searchParams = useSearchParams();
  const isLinkModalOpen = searchParams.get('accountLink') === 'true';
  const { submitAccountLink, cancelAccountLink, isPending } = useSocialAccountLinkMutation();

  useEffect(() => {
    useSignupDraftStore.getState().resetDraft();
    useAgreementStore.getState().reset();
  }, []);

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
          onConfirm={submitAccountLink}
          onCancel={cancelAccountLink}
          isPending={isPending}
        />
      )}
    </>
  );
};

export default LoginSection;
