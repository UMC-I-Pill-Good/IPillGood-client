'use client';

import { useCallback, useRef, useState, type KeyboardEvent } from 'react';

import { AdminFilterChevronIcon } from '@/assets';
import { useEscapeKey } from '@/shared/hooks/useEscapeKey';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { cn } from '@/shared/utils/cn';

import { FAQ_CATEGORY_LIST, type FaqCategoryType } from '../constants/FaqCategory';

const FAQ_FILTER_OPTION_LIST = FAQ_CATEGORY_LIST;

interface FaqCategoryFilterProps {
  value: FaqCategoryType;
  onChange: (value: FaqCategoryType) => void;
}

const FaqCategoryFilter = ({ value, onChange }: FaqCategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(() =>
    FAQ_FILTER_OPTION_LIST.indexOf(value),
  );
  const filterRef = useRef<HTMLDivElement>(null);
  const optionButtonRefList = useRef<Array<HTMLButtonElement | null>>([]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useOutsideClick(filterRef, handleClose);
  useEscapeKey(handleClose);

  const handleToggleClick = () => {
    setIsOpen((previousIsOpen) => {
      if (!previousIsOpen) {
        setActiveOptionIndex(FAQ_FILTER_OPTION_LIST.indexOf(value));
      }

      return !previousIsOpen;
    });
  };

  const handleOptionClick = (category: FaqCategoryType) => {
    onChange(category);
    setIsOpen(false);
  };

  const handleListboxKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let nextOptionIndex = activeOptionIndex;

    if (event.key === 'ArrowDown') {
      nextOptionIndex = (activeOptionIndex + 1) % FAQ_FILTER_OPTION_LIST.length;
    } else if (event.key === 'ArrowUp') {
      nextOptionIndex =
        (activeOptionIndex - 1 + FAQ_FILTER_OPTION_LIST.length) %
        FAQ_FILTER_OPTION_LIST.length;
    } else if (event.key === 'Home') {
      nextOptionIndex = 0;
    } else if (event.key === 'End') {
      nextOptionIndex = FAQ_FILTER_OPTION_LIST.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveOptionIndex(nextOptionIndex);
    optionButtonRefList.current[nextOptionIndex]?.focus();
  };

  return (
    <div ref={filterRef} className='relative shrink-0'>
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        onClick={handleToggleClick}
        className='flex items-center justify-center gap-2.5 rounded-lg bg-secondary px-7 py-4 text-lg font-medium leading-none text-white'
      >
        <span>{value}</span>
        <AdminFilterChevronIcon
          aria-hidden='true'
          className={cn('h-4 w-2.5 -rotate-90 transition-transform', isOpen && 'rotate-90')}
        />
      </button>

      {isOpen && (
        <div
          role='listbox'
          aria-label='FAQ 카테고리'
          onKeyDown={handleListboxKeyDown}
          className='absolute left-1/2 top-full z-20 min-w-full -translate-x-1/2 overflow-hidden rounded-lg border border-neutral-500 bg-white'
        >
          {FAQ_FILTER_OPTION_LIST.map((category, optionIndex) => (
            <button
              key={category}
              ref={(element) => {
                optionButtonRefList.current[optionIndex] = element;
              }}
              type='button'
              role='option'
              aria-selected={category === value}
              tabIndex={optionIndex === activeOptionIndex ? 0 : -1}
              onClick={() => handleOptionClick(category)}
              onFocus={() => setActiveOptionIndex(optionIndex)}
              className={cn(
                'block w-full whitespace-nowrap border-b border-neutral-500 px-7 py-4 text-center text-lg font-medium leading-none text-neutral last:border-b-0 hover:text-black focus-visible:text-black focus-visible:outline-none',
                category === value && 'text-black',
              )}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaqCategoryFilter;
