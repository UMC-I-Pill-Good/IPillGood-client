'use client';

import { useRef, useState } from 'react';
import { DropdownIcon } from '@/assets';
import { useEscapeKey, useOutsideClick } from '@/shared/hooks';
import type { ReviewSort } from '../types/review';
import DropdownOptionMenu from '@/features/ranking/components/default/DropdownOptionMenu';

interface ReviewSortDropdownProps {
  sort: ReviewSort;
  onChange: (sort: ReviewSort) => void;
}

const SORT_OPTIONS: readonly ReviewSort[] = ['LATEST', 'LIKE_COUNT_DESC'];
const SORT_LABELS: Record<ReviewSort, string> = {
  LATEST: '최신순',
  LIKE_COUNT_DESC: '좋아요순',
};

const ReviewSortDropdown = ({ sort, onChange }: ReviewSortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEscapeKey(() => setIsOpen(false));
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div ref={dropdownRef} className='relative shrink-0'>
      <button
        type='button'
        className='glass flex h-8 items-center gap-1 rounded-lg bg-transparent px-2 typo-caption-2 text-neutral-800 shadow-[4px_4px_4px_rgba(155,161,255,0.1)]'
        aria-label='후기 정렬 방식'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{SORT_LABELS[sort]}</span>
        <DropdownIcon aria-hidden='true' className='size-6' />
      </button>
      {isOpen && (
        <DropdownOptionMenu
          options={SORT_OPTIONS}
          selectedOption={sort}
          getOptionLabel={(option) => SORT_LABELS[option]}
          onSelect={(option) => {
            onChange(option);
            setIsOpen(false);
          }}
          className='w-20.25'
        />
      )}
    </div>
  );
};

export default ReviewSortDropdown;
