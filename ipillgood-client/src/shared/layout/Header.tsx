'use client';
import { ChevronLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IconButton } from '@/shared/components';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean; // 기본 true
  showCloseButton?: boolean; // 기본 false
  onBack?: () => void; // 없으면 router.back()
  onClose?: () => void; // 없으면 router.back()
}

export const Header = ({
  title,
  showBackButton = true,
  showCloseButton = false,
  onBack,
  onClose,
}: HeaderProps) => {
  const router = useRouter();
  const handleBack = onBack ?? (() => router.back());
  const handleClose = onClose ?? (() => router.back());

  const isBackOnly = showBackButton && !showCloseButton;

  return (
    <header className='flex h-17.5 w-full items-center gap-2 px-5'>
      {showBackButton && (
        <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' onClick={handleBack} />
      )}

      {isBackOnly ? (
        <h1 className='typo-subtitle-4 text-neutral-900'>{title}</h1>
      ) : (
        <>
          {!showBackButton && <div className='w-9' />}
          <h1 className='flex-1 text-center typo-subtitle-4 text-neutral-900'>{title}</h1>
          {!showCloseButton && <div className='w-9' />}
        </>
      )}

      {showCloseButton && (
        <IconButton icon={<X size={22} />} ariaLabel='닫기' onClick={handleClose} />
      )}
    </header>
  );
};
