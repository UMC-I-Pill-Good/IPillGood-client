'use clinet';

import { useAtom } from 'jotai';
import { genderAtom } from '@/features/survey/atoms/survey.atom';
import clsx from 'clsx';
import { CalendarIcon, ManIcon, WomanIcon } from '@/assets';
import { ChevronDown } from 'lucide-react';
import DropdownMenu from './DropdownMenu';
import { useRef, useState } from 'react';
import { periodOptions } from '@/features/survey/constants/basicInfo.constants';
import DatePickerBottomSheet from './DatePickerBottomSheet';
import { useOutsideClick } from '@/shared/hooks';

const GenderSelectSection = () => {
  const [gender, setGender] = useAtom(genderAtom);
  const [isPeriodOpenDropDown, setIsPeriodOpenDropDown] = useState(false);
  const [period, setPeriod] = useState(30);

  const [isOpenDateSheet, setIsOpenDateSheet] = useState(false);

  const [selectedDate, setSelectedDate] = useState({
    year: 2026,
    month: 7,
    day: 17,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => {
    setIsPeriodOpenDropDown(false);
  });

  return (
    <section className='space-y-2 py-8'>
      <h5 className='typo-body-5 ml-1'>
        2. 성별을 선택해주세요. <span className='text-semantic'>*</span>
      </h5>

      <article className='flex items-center gap-2'>
        <button
          type='button'
          onClick={() => setGender('woman')}
          className={clsx(
            'group flex flex-1 flex-col items-center justify-center gap-2 rounded-[20px] border no-center-glass h-33 transition',
            'hover:border-transparent hover:bg-secondary/50 active:bg-secondary/70',
            gender === 'woman' ? 'border-transparent bg-secondary/50' : 'bg-white/50 border-white',
          )}
        >
          <div
            className={clsx(
              'flex h-15 w-15 items-center justify-center rounded-full bg-secondary-200 transition',
              'group-hover:bg-secondary/30 group-active:bg-secondary/40',
              gender === 'woman' && 'bg-secondary/30',
            )}
          >
            <WomanIcon />
          </div>
          <p className='typo-body-10'>여성</p>
        </button>

        <button
          type='button'
          onClick={() => setGender('man')}
          className={clsx(
            'group flex flex-1 flex-col items-center justify-center gap-2 rounded-[20px] border no-center-glass h-33 transition',
            'hover:border-transparent hover:bg-secondary/50 active:bg-secondary/70',
            gender === 'man' ? 'border-transparent bg-secondary/50' : 'bg-white/50 border-white',
          )}
        >
          <div
            className={clsx(
              'flex h-15 w-15 items-center justify-center rounded-full bg-secondary-200 transition',
              'group-hover:bg-secondary/30 group-active:bg-secondary/40',
              gender === 'man' && 'bg-secondary/30',
            )}
          >
            <ManIcon />
          </div>

          <p className='typo-body-10'>남성</p>
        </button>
      </article>

      {gender === 'woman' && (
        <article className='bg-white/50 border border-white rounded-[20px] no-center-glass p-3 py-4 w-full h-30 relative z-30'>
          <p className='typo-body-10 mb-2'>
            여성 정보 <span className='text-neutral'>(선택 입력)</span>
          </p>
          <div
            ref={dropdownRef}
            onClick={(e) => e.stopPropagation()}
            className='flex items-center justify-between relative mb-1.5'
          >
            <p className='typo-caption-2'>생리 주기</p>
            <button
              type='button'
              className='ring ring-primary text-primary inline-flex items-center justify-center gap-1 typo-caption-2 rounded-[20px] pr-2 pl-2.5 h-7 w-18 outline-none transition hover:bg-primary-400 hover:text-white hover:ring-transparent active:text-white active:bg-primary shirnk-0 whitespace-nowrap'
              onClick={() => setIsPeriodOpenDropDown((prev) => !prev)}
            >
              {period}일
              <ChevronDown
                className={clsx(
                  'transition-transform duration-300',
                  isPeriodOpenDropDown && 'rotate-180',
                )}
              />
            </button>

            {isPeriodOpenDropDown && (
              <DropdownMenu
                options={periodOptions}
                value={period}
                onSelect={(selected) => {
                  setPeriod(selected);
                  setIsPeriodOpenDropDown(false);
                }}
                onClose={() => setIsPeriodOpenDropDown(false)}
                className='w-18 right-0'
              />
            )}
          </div>
          <div className='relative flex items-center justify-between'>
            <p className='typo-caption-2'>마지막 생리 시작일</p>
            <button
              type='button'
              className='ring ring-primary text-primary inline-flex items-center justify-center gap-1.5 typo-caption-2 rounded-[20px] pr-2 pl-2.5 h-7 w-28 outline-none transition hover:bg-primary-400 hover:text-white hover:ring-transparent active:text-white active:bg-primary shirnk-0 whitespace-nowrap'
              onClick={() => setIsOpenDateSheet((prev) => !prev)}
            >
              {selectedDate.year}.{String(selectedDate.month).padStart(2, '0')}.
              {String(selectedDate.day).padStart(2, '0')}
              <CalendarIcon className='transition-colors mb-0.5' />
            </button>
          </div>
        </article>
      )}

      <DatePickerBottomSheet
        open={isOpenDateSheet}
        value={selectedDate}
        onOpenChange={setIsOpenDateSheet}
        onChange={setSelectedDate}
      />
    </section>
  );
};

export default GenderSelectSection;
