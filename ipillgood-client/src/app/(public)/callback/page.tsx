'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const socialSignupToken = searchParams.get('socialSignupToken');
    const provider = searchParams.get('provider');

    if (!socialSignupToken || !provider) {
      return;
    }

    localStorage.setItem('socialSignupToken', socialSignupToken);
    localStorage.setItem('provider', provider);

    router.replace('/signup/social');
  }, [router, searchParams]);

  return (
    <main className='flex flex-col items-center justify-center min-h-screen gap-5'>
      <div className='w-24 h-24 border-6 border-primary border-t-transparent rounded-full animate-spin'></div>

      <p className='text-[#6D7280] font-medium text-lg'>로그인 처리 중...</p>
    </main>
  );
};

export default CallbackPage;
