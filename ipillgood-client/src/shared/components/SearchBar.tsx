'use client';

import { Search, X } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { cn } from '@/shared/utils/cn';
import { FilterIcon } from '@/assets';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  onFilter?: () => void;
  placeholder: string;
  isFilterButton?: boolean;
  isClearButton?: boolean;
  className?: string;
  inputClassName?: string;
  filterButtonClassName?: string;
}

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  onFilter,
  placeholder,
  isFilterButton = true,
  isClearButton = false,
  className,
  inputClassName,
  filterButtonClassName,
}: SearchBarProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return; // IME 조합 중 엔터 오작동 방지
    if (!value.trim()) return;
    onSearch?.();
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div
      className={cn(
        'flex h-11 w-full items-center justify-between gap-1 rounded-2xl border border-white bg-white/90 px-3 py-3 text-black backdrop-blur-2xl',
        className,
      )}
    >
      <button
        type='button'
        onClick={onSearch}
        aria-label='검색 실행'
        className='flex size-5 shrink-0 items-center justify-center text-primary'
      >
        <Search size={20} aria-hidden='true' />
      </button>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          'flex-1 bg-transparent outline-none typo-body-10 placeholder:text-neutral-500 placeholder:font-normal',
          inputClassName,
        )}
      />

      {isClearButton && value && (
        <button
          type='button'
          onClick={handleClear}
          aria-label='검색어 삭제'
          className='flex shrink-0 items-center justify-center text-neutral'
        >
          <X size={24} aria-hidden='true' />
        </button>
      )}

      {isFilterButton && (
        <button
          type='button'
          onClick={onFilter}
          aria-label='필터'
          className={cn(
            'flex size-5 shrink-0 items-center justify-center text-primary',
            filterButtonClassName,
          )}
        >
          <FilterIcon />
        </button>
      )}
    </div>
  );
};
