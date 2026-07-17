'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  RANKING_UI_SORT_LABELS,
  RANKING_UI_SORT_OPTIONS,
} from '../constants/sortOptions';
import type { RankingUiSort } from '../types/ranking';
import DropdownOptionMenu from './DropdownOptionMenu';

interface SortDropdownProps {
  selectedSort: RankingUiSort;
  onSortChange: (sort: RankingUiSort) => void;
}

const SortDropdown = ({ selectedSort, onSortChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (option: RankingUiSort) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className='relative shrink-0'>
      <button
        type='button'
        className='ranking-control-glass inline-flex h-8 w-28 shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-lg p-2 typo-caption-2 text-neutral-800'
        aria-label='정렬 방식'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{RANKING_UI_SORT_LABELS[selectedSort]}</span>
        <ChevronDown size={24} aria-hidden='true' />
      </button>
      {isOpen && (
        <DropdownOptionMenu
          options={RANKING_UI_SORT_OPTIONS}
          getOptionLabel={(option) => RANKING_UI_SORT_LABELS[option]}
          selectedOption={selectedSort}
          onSelect={handleSelect}
          className='w-28'
        />
      )}
    </div>
  );
};

export default SortDropdown;
