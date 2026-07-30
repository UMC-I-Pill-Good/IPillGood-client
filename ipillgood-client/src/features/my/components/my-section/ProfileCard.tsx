'use client';

import Link from 'next/link';
import { useMyInfo } from '../../hooks/useMyInfo';
import Image from 'next/image';

const ProfileCard = () => {
  const { data, isLoading } = useMyInfo();
  const { nickname, profileImageUrl } = data ?? {};

  return (
    <div className='flex px-5 py-4 gap-3 bg-linear-[165deg] from-primary-300/50 to-primary-300/70 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(126,131,135,0.10)]'>
      <div className='bg-primary-100 rounded-full w-20 h-20 overflow-hidden'>
        {isLoading ? (
          <div className='w-full h-full animate-pulse bg-primary-200' />
        ) : (
          profileImageUrl && (
            <Image width={80} height={80} src={profileImageUrl} alt='프로필 사진' />
          )
        )}
      </div>
      <div className='flex flex-col gap-1.75 justify-center'>
        {isLoading ? (
          <div className='w-16 h-4 rounded animate-pulse bg-primary-300' />
        ) : (
          <p className='text-black typo-body-2'>{nickname}</p>
        )}
        <Link
          href='/my/profile'
          className='rounded-full px-5 py-[9.5px] bg-primary-600 hover:bg-primary-700 active:bg-primary-800 typo-caption-2 transition-colors duration-200 text-white shadow-[4px_4px_15px_0px_rgba(0,0,0,0.10)]'
        >
          프로필 관리
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
