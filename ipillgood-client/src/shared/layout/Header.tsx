'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IconButton } from '@/shared/components';
import { cn } from '@/shared/utils';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean; // 기본 true
  showCloseButton?: boolean; // 기본 false
  onBack?: () => void; // 없으면 router.back()
  onClose?: () => void; // 없으면 router.back()
  titleClassName?: string;
  leftSpacerClassName?: string;
  alignWrappedTitleToBottom?: boolean;
}

export const Header = ({
  title,
  showBackButton = true,
  showCloseButton = false,
  onBack,
  onClose,
  titleClassName,
  leftSpacerClassName,
  alignWrappedTitleToBottom = false,
}: HeaderProps) => {
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isTitleWrapped, setIsTitleWrapped] = useState(false);
  const handleBack = onBack ?? (() => router.back());
  const handleClose = onClose ?? (() => router.back());

  const isBackOnly = showBackButton && !showCloseButton;

  useEffect(() => {
    if (!alignWrappedTitleToBottom || !titleRef.current) return;

    const titleElement = titleRef.current;
    const updateTitleWrapping = () => {
      const range = document.createRange();
      range.selectNodeContents(titleElement);
      setIsTitleWrapped(range.getClientRects().length > 1);
    };
    const resizeObserver = new ResizeObserver(updateTitleWrapping);

    resizeObserver.observe(titleElement);
    updateTitleWrapping();

    return () => resizeObserver.disconnect();
  }, [alignWrappedTitleToBottom, title]);

  return (
    <header className='flex h-17.5 w-full items-center gap-2 px-5'>
      {showBackButton && (
        <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' onClick={handleBack} />
      )}

      {isBackOnly ? (
        <h1
          ref={titleRef}
          className={cn(
            'typo-subtitle-4 text-neutral-900',
            alignWrappedTitleToBottom && isTitleWrapped && 'self-end',
            titleClassName,
          )}
        >
          {title}
        </h1>
      ) : (
        <>
          {!showBackButton && <div className={cn('w-9 shrink-0', leftSpacerClassName)} />}
          <h1
            ref={titleRef}
            className={cn(
              'flex-1 text-center typo-subtitle-4 text-neutral-900',
              alignWrappedTitleToBottom && isTitleWrapped && 'self-end',
              titleClassName,
            )}
          >
            {title}
          </h1>
          {!showCloseButton && <div className='w-9' />}
        </>
      )}

      {showCloseButton && (
        <IconButton icon={<X size={22} />} ariaLabel='닫기' onClick={handleClose} />
      )}
    </header>
  );
};
