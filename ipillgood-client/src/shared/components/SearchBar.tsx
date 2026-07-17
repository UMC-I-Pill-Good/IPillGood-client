'use client';

import { Search } from 'lucide-react';
import { KeyboardEvent, ReactNode } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder: string;
  rightElement?: ReactNode;
}

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder,
  rightElement,
}: SearchBarProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return; // IME 조합 중 엔터 오작동 방지
    if (!value.trim()) return;
    onSearch?.();
  };

  return (
    <div className='ranking-search-glass flex h-[50px] w-full items-center justify-between rounded-[16px] px-3 py-3 text-primary-600'>
      <Search size={20} aria-hidden='true' className='shrink-0' />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        className='min-w-0 flex-1 bg-transparent px-1 typo-body-11 outline-none placeholder:text-neutral-800'
      />
      {rightElement}
    </div>
  );
};
