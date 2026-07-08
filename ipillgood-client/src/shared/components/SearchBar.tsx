'use client';

import { Search } from 'lucide-react';
import { KeyboardEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, onSearch, placeholder = 'Text' }: SearchBarProps) => {
  const handleSearch = () => {
    if (!value.trim()) return;
    onSearch?.();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return; // IME 조합 중 엔터 오작동 방지
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className='flex h-10 w-88.25 items-center justify-between rounded-[10px] bg-primary-300 px-3 py-2.5 shadow-[0px_4px_4px_0px_rgba(126,131,135,0.10)] backdrop-blur-xs'>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className='flex-1 bg-transparent text-body-7 text-neutral-900 outline-none placeholder:text-neutral-900'
      />
      <button type='button' onClick={handleSearch} aria-label='검색'>
        <Search size={27} className='text-[#4680FE]' />
      </button>
    </div>
  );
};
