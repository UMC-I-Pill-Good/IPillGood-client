'use client';

import Link from 'next/link';
import { useMyInfoQuery } from '@/shared/hooks';
import Image from 'next/image';

const ProfileCard = () => {
  const { data, isLoading } = useMyInfoQuery();

  return (
    <div className='flex px-5 py-4 gap-3 bg-linear-[165deg] from-primary-300/50 to-primary-300/70 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(126,131,135,0.10)]'>
      <div className='bg-primary-100 rounded-full w-20 h-20 overflow-hidden'>
        {isLoading ? (
          <div className='w-full h-full animate-pulse bg-primary-200' />
        ) : (
          data?.profileImageUrl && (
            <Image width={80} height={80} src={data.profileImageUrl} alt='프로필 사진' preload />
          )
        )}
      </div>
      <div className='flex min-w-0 flex-col justify-center gap-1.75'>
        {isLoading ? (
          <div className='w-16 h- rounded animate-pulse bg-primary-300' />
        ) : (
          <p className='truncate text-black text-[18px] typo-title-gosanja pt-1'>
            {data?.nickname ?? '회원'}
          </p>
        )}
        <Link
          href='/my/profile'
          className='self-start whitespace-nowrap rounded-full bg-primary-600 px-5 py-[9.5px] text-white shadow-[4px_4px_15px_0px_rgba(0,0,0,0.10)] transition-colors duration-200 hover:bg-primary-700 active:bg-primary-800 typo-caption-2'
        >
          프로필 관리
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
