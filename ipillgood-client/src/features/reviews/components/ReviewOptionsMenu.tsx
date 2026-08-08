'use client';

import { useRef, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useEscapeKey, useOutsideClick } from '@/shared/hooks';

interface ReviewOptionsMenuProps {
  reviewId: number;
  onEdit: () => void;
  onDelete: () => void;
}

const ReviewOptionsMenu = ({ reviewId, onEdit, onDelete }: ReviewOptionsMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = `review-menu-${reviewId}`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEscapeKey(() => setIsMenuOpen(false));
  useOutsideClick(menuRef, () => setIsMenuOpen(false));

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete();
  };

  return (
    <div ref={menuRef} className='relative ml-auto'>
      <button
        type='button'
        aria-label='후기 메뉴 열기'
        aria-haspopup='menu'
        aria-controls={menuId}
        aria-expanded={isMenuOpen}
        className='flex size-6 items-center justify-center rounded-full py-2 text-neutral-800 transition hover:bg-gray-200'
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <MoreHorizontal aria-hidden='true' className='size-5' />
      </button>
      {isMenuOpen && (
        <div
          id={menuId}
          role='menu'
          className='absolute bottom-8 right-0 z-10 flex h-24 w-20.25 flex-col items-start overflow-hidden rounded-lg border border-white bg-white/80 shadow-md backdrop-blur-[20px]'
        >
          <button
            type='button'
            role='menuitem'
            className='flex h-8 w-full items-center justify-center gap-1 border-b border-neutral-300 px-2 typo-caption-2 text-black'
            onClick={onEdit}
          >
            후기 수정
          </button>
          <button
            type='button'
            role='menuitem'
            className='flex h-8 w-full items-center justify-center gap-1 border-b border-neutral-300 px-2 typo-caption-2 text-neutral-800'
            onClick={handleDelete}
          >
            후기 삭제
          </button>
          <button
            type='button'
            role='menuitem'
            className='flex h-8 w-full items-center justify-center gap-1 px-2 typo-caption-2 text-neutral-800'
            onClick={() => setIsMenuOpen(false)}
          >
            취소
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewOptionsMenu;
