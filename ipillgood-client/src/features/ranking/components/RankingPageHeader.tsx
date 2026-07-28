'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IconButton } from '@/shared/components';

interface RankingPageHeaderProps {
  title: string;
}

const RankingPageHeader = ({ title }: RankingPageHeaderProps) => {
  const router = useRouter();

  return (
    <header className='flex h-17.5 w-full items-center gap-2 overflow-hidden bg-neutral-100 px-5 shadow-[0px_4px_4px_0px_rgba(126,131,135,0.10)]'>
      <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' onClick={() => router.back()} />
      <h1 className='min-w-0 truncate text-[24px] font-semibold leading-normal text-neutral-900'>{title}</h1>
    </header>
  );
};

export default RankingPageHeader;
