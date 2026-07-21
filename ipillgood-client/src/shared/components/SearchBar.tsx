'use client';

import { Search, X } from 'lucide-react';
import { KeyboardEvent, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder: string;
  rightElement?: ReactNode;
  className?: string;
  inputClassName?: string;
  searchIconClassName?: string;
  searchIconSize?: number;
}

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder,
  rightElement,
  className,
  inputClassName,
  searchIconClassName,
  searchIconSize = 20,
}: SearchBarProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return; // IME 조합 중 엔터 오작동 방지
    if (!value.trim()) return;
    onSearch?.();
  };

  return (
    <div
      className={cn(
        'flex h-11 w-full items-center justify-between gap-1 rounded-[10px] border border-white bg-white/90 px-3 py-3 text-[#4680FE] backdrop-blur-xs',
        className,
      )}
    >
      <Search
        size={searchIconSize}
        aria-hidden='true'
        className={cn('shrink-0', searchIconClassName)}
      />
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
      {rightElement ??
        (value.trim() && (
          <button
            type='button'
            onClick={() => onChange('')}
            aria-label='검색어 지우기'
            className='cursor-pointer'
          >
            <X size={24} className='text-neutral-800' />
          </button>
        ))}
    </div>
  );
};
