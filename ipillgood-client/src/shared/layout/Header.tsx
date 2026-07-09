'use client';
import { ChevronLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IconButton } from '@/shared/components';

interface HeaderProps {
  title?: string;
  hasBackButton?: boolean; // 기본 true
  hasCloseButton?: boolean; // 기본 false
  onBack?: () => void; // 없으면 router.back()
  onClose?: () => void; // 없으면 router.back()
}

export const Header = ({
  title,
  hasBackButton = true,
  hasCloseButton = false,
  onBack,
  onClose,
}: HeaderProps) => {
  const router = useRouter();
  const handleBack = onBack ?? (() => router.back());
  const handleClose = onClose ?? (() => router.back());

  const isBackOnly = hasBackButton && !hasCloseButton;

  return (
    <header className='flex h-17.5 w-full items-center gap-2 bg-[#f7f8f9] px-5 shadow-[0px_4px_4px_0px_rgba(126,131,135,0.10)]'>
      {hasBackButton && (
        <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' onClick={handleBack} />
      )}

      {isBackOnly ? (
        <span className='typo-subtitle-4 text-neutral-900'>{title}</span>
      ) : (
        <>
          {!hasBackButton && <div className='w-9' />}
          <div className='flex-1 text-center typo-subtitle-4 text-neutral-900'>{title}</div>
          {!hasCloseButton && <div className='w-9' />}
        </>
      )}

      {hasCloseButton && (
        <IconButton icon={<X size={22} />} ariaLabel='닫기' onClick={handleClose} />
      )}
    </header>
  );
};
