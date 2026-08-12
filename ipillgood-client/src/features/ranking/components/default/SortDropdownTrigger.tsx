'use client';

import { useEffect, useRef, useState } from 'react';
import { RANKING_UI_SORT_LABELS, RANKING_UI_SORT_OPTIONS } from '../../constants/sortOptions';
import type { RankingUiSort } from '../../types/ranking';
import DropdownOptionMenu from './DropdownOptionMenu';
import { ChevronDown } from 'lucide-react';

interface SortDropdownTriggerProps {
  selectedSort: RankingUiSort;
  onSortChange: (sort: RankingUiSort) => void;
}

const SortDropdownTrigger = ({ selectedSort, onSortChange }: SortDropdownTriggerProps) => {
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
        className='glass h-8 rounded-lg bg-transparent p-2 typo-caption-2 text-neutral-800 shadow-[4px_4px_4px_rgba(155,161,255,0.1)]'
        aria-label='정렬 방식'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{RANKING_UI_SORT_LABELS[selectedSort]}</span>
        <ChevronDown
          aria-hidden='true'
          className={`size-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <DropdownOptionMenu
          options={RANKING_UI_SORT_OPTIONS}
          getOptionLabel={(option) => RANKING_UI_SORT_LABELS[option]}
          selectedOption={selectedSort}
          onSelect={handleSelect}
          className='min-w-full'
        />
      )}
    </div>
  );
};

export default SortDropdownTrigger;
