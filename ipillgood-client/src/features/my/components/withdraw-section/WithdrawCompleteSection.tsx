'use client';

import { MascotBigIcon } from '@/assets';
import { TextButton } from '@/shared/components';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const WithdrawCompleteSection = () => {
  const router = useRouter();

  return (
    <section className='flex flex-col flex-1 items-center justify-center pt-12.75 pb-20 px-5'>
      <div className='flex items-center justify-center w-25 h-25 rounded-full bg-primary-200'>
        <Check size={60} className='text-primary-600' />
      </div>
      <h2 className='text-black typo-body-1 mt-4'>회원 탈퇴가 완료되었습니다.</h2>
      <p className='text-black typo-caption-2 mt-3 mb-12.75'>
        그동안 <span className='text-primary-600'>아필굿</span>을 이용해 주셔서 감사합니다.
      </p>
      <MascotBigIcon />
      <TextButton
        type='button'
        size='xl'
        text='확인'
        className='w-full mt-auto'
        onClick={() => router.push('/login')}
      />
    </section>
  );
};

export default WithdrawCompleteSection;
