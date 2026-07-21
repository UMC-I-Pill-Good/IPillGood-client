'use client';

import { Search } from 'lucide-react';
import { KeyboardEvent } from 'react';
import { cn } from '@/shared/utils/cn';
import { FilterIcon } from '@/assets';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  onFilter?: () => void;
  placeholder: string;
  isFilterButton?: boolean;
  className?: string;
  inputClassName?: string;
}

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  onFilter,
  placeholder,
  isFilterButton = true,
  className,
  inputClassName,
}: SearchBarProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return; // IME 조합 중 엔터 오작동 방지
    if (!value.trim()) return;
    onSearch?.();
  };

  return (
    <div
      className={cn(
        'flex h-11 w-full items-center justify-between gap-1 rounded-2xl border border-white bg-white/90 px-3 py-3 text-black backdrop-blur-2xl',
        className,
      )}
    >
      <Search size={20} aria-hidden='true' className='shrink-0 text-primary' />
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
      {isFilterButton && (
        <button type='button' onClick={onFilter} aria-label='필터'>
          <FilterIcon />
        </button>
      )}
    </div>
  );
};
