'use client';

import type { ChangeEvent, FormEvent } from 'react';

import { AdminSearchIcon } from '@/assets';
import { cn } from '@/shared/utils';

interface AdminSearchBarProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
}

const AdminSearchBar = ({
  value,
  placeholder,
  onChange,
  onSearch,
  className,
}: AdminSearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.(value);
  };

  return (
    <form
      role='search'
      onSubmit={handleSubmit}
      className={cn(
        'flex w-full items-center gap-1 rounded-lg border border-neutral p-4',
        className,
      )}
    >
      <button type='submit' aria-label='검색' className='size-5 shrink-0'>
        <AdminSearchIcon className='size-5' aria-hidden='true' />
      </button>
      <input
        type='text'
        inputMode='search'
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className='min-w-0 flex-1 rounded-sm bg-transparent text-lg font-medium leading-none text-black outline-none placeholder:text-neutral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
      />
    </form>
  );
};

export default AdminSearchBar;
