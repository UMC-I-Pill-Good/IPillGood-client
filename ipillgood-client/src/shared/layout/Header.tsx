'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IconButton } from '@/shared/components';
import { cn } from '@/shared/utils';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean; // 기본 true
  titleClassName?: string;
  leftSpacerClassName?: string;
  alignWrappedTitleToBottom?: boolean;
}

export const Header = ({
  title,
  showBackButton = true,
  titleClassName,
  leftSpacerClassName,
  alignWrappedTitleToBottom = false,
}: HeaderProps) => {
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isTitleWrapped, setIsTitleWrapped] = useState(false);
  const handleBack = () => router.back();

  useLayoutEffect(() => {
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
  }, [alignWrappedTitleToBottom, showBackButton, title]);

  return (
    <header
      className={cn(
        'flex h-17.5 w-full items-center gap-2 px-5',
        showBackButton && 'sticky top-0 z-10 bg-background',
      )}
    >
      {showBackButton && (
        <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' onClick={handleBack} />
      )}

      {showBackButton ? (
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
          <div className={cn('w-9 shrink-0', leftSpacerClassName)} />
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
          <div className='w-9' />
        </>
      )}
    </header>
  );
};
