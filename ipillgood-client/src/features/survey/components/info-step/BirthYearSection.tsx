import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import DropdownMenu from './DropdownMenu';
import { yearOptions } from '@/features/survey/constants/basicInfo.constants';
import { useOutsideClick } from '@/shared/hooks';
import { useAtom } from 'jotai';
import { birthYearAtom } from '@/features/survey/atoms/survey.atom';

const BirthYearSection = () => {
  const [isYearOpenDropdown, setIsYearOpenDropdown] = useState(false);
  const [year, setYear] = useAtom(birthYearAtom);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => {
    setIsYearOpenDropdown(false);
  });

  return (
    <section className='mt-2 flex flex-col items-start gap-2'>
      <h5 className='typo-body-5 ml-1'>
        1. 출생 연도를 선택해주세요.<span className='text-semantic'>*</span>
      </h5>

      <div
        ref={dropdownRef}
        onClick={(e) => e.stopPropagation()}
        className='flex items-center gap-1 relative'
      >
        <button
          type='button'
          aria-haspopup='listbox'
          aria-expanded={isYearOpenDropdown}
          aria-controls='birth-year-dropdown'
          className='bg-primary/80 inline-flex items-center justify-center gap-1 typo-body-10 rounded-lg pr-3 pl-4 h-8 w-25 outline-none text-white shadow-[0_4px_4px_rgba(126,131,135,0.1)] transition hover:bg-primary-700 active:bg-primary-800 shirnk-0'
          onClick={() => setIsYearOpenDropdown((prev) => !prev)}
        >
          {year}
          <ChevronDown
            className={clsx(
              'transition-transform duration-300',
              isYearOpenDropdown && 'rotate-180',
            )}
          />
        </button>

        {isYearOpenDropdown && (
          <DropdownMenu
            id='birth-year-dropdown'
            options={yearOptions}
            value={year}
            onSelect={(selected) => {
              setYear(selected);
              setIsYearOpenDropdown(false);
            }}
            className='w-25 left-0'
            onClose={() => setIsYearOpenDropdown(false)}
          />
        )}

        <span className='typo-body-6 text-neutral'>년생</span>
      </div>
    </section>
  );
};

export default BirthYearSection;
