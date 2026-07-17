import { CalendarIcon, ManIcon, WomanIcon } from '@/assets';
import DropdownMenu from '@/shared/components/DropdownMenu';
import { StepHeader } from '@/shared/layout';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import DatePickerBottomSheet from './DatePickerBottomSheet';
import { TextButton } from '@/shared/components';
import {
  birthYearOptions,
  jobOptions,
  periodOptions,
} from '@/features/survey/constants/survey.constants';

const BasicInfoStep = () => {
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [year, setYear] = useState(2026);

  const [gender, setGender] = useState<'woman' | 'man' | null>(null);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const [isBeginOpen, setIsBeginOpen] = useState(false);
  const [period, setPeriod] = useState(30);
  const [selectedDate, setSelectedDate] = useState({
    year: 2026,
    month: 7,
    day: 17,
  });

  const [selectedJob, setSelectedJob] = useState('');

  return (
    <div
      onClick={() => {
        setIsYearOpen(false);
        setIsPeriodOpen(false);
      }}
    >
      <StepHeader title='기본 정보를 알려주세요!' desc='나에게 맞는 영양제를 추천해드릴게요.' />

      <section className='py-4 flex flex-col items-start gap-2'>
        <h5 className='typo-body-5'>
          1. 출생 연도를 선택해주세요.<span className='text-semantic'>*</span>
        </h5>

        <div onClick={(e) => e.stopPropagation()} className='flex items-center gap-1 relative'>
          <button
            type='button'
            className='bg-primary/80 inline-flex items-center justify-center gap-1 typo-body-10 rounded-lg pr-3 pl-4 h-8 w-25 text-white shadow-[0_4px_4px_rgba(126,131,135,0.1)] transition hover:bg-primary-700 active:bg-primary-800 shirnk-0'
            onClick={() => setIsYearOpen((prev) => !prev)}
          >
            {year}
            <ChevronDown
              className={clsx('transition-transform duration-300', isYearOpen && 'rotate-180')}
            />
          </button>

          {isYearOpen && (
            <DropdownMenu
              options={birthYearOptions}
              value={year}
              onSelect={(selected) => {
                setYear(selected);
                setIsYearOpen(false);
              }}
              className='w-25 left-0'
            />
          )}

          <span className='typo-body-6 text-neutral'>년생</span>
        </div>
      </section>

      <section className='py-4 space-y-2'>
        <h5 className='typo-body-5'>
          2. 성별을 선택해주세요.<span className='text-semantic'>*</span>
        </h5>

        <article className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => setGender('woman')}
            className={clsx(
              'group flex flex-1 flex-col items-center justify-center gap-2 rounded-[20px] border no-center-glass h-33 transition',
              'hover:border-secondary/0 hover:bg-secondary/30 active:bg-secondary/50',
              gender === 'woman'
                ? 'border-secondary/0 bg-secondary/30'
                : 'bg-white/50 border-white',
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
              'hover:border-secondary/0 hover:bg-secondary/30 active:bg-secondary/50',
              gender === 'man' ? 'border-secondary/0 bg-secondary/30' : 'bg-white/50 border-white',
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
              onClick={(e) => e.stopPropagation()}
              className='flex items-center justify-between relative mb-1.5'
            >
              <p className='typo-caption-2'>생리 주기</p>
              <button
                type='button'
                className='ring ring-primary text-primary inline-flex items-center justify-center gap-1 typo-caption-2 rounded-[20px] pr-2 pl-2.5 h-7 w-18 transition hover:bg-primary-400 hover:text-white hover:ring-none active:text-white active:bg-primary shirnk-0 whitespace-nowrap'
                onClick={() => setIsPeriodOpen((prev) => !prev)}
              >
                {period}일
                <ChevronDown
                  className={clsx(
                    'transition-transform duration-300',
                    isPeriodOpen && 'rotate-180',
                  )}
                />
              </button>

              {isPeriodOpen && (
                <DropdownMenu
                  options={periodOptions}
                  value={period}
                  onSelect={(selected) => {
                    setPeriod(selected);
                    setIsPeriodOpen(false);
                  }}
                  className='w-18 right-0'
                />
              )}
            </div>
            <div className='relative flex items-center justify-between'>
              <p className='typo-caption-2'>마지막 생리 시작일</p>
              <button
                type='button'
                className='ring ring-primary text-primary inline-flex items-center justify-center gap-1.5 typo-caption-2 rounded-[20px] pr-2 pl-2.5 h-7 w-28 transition hover:bg-primary-400 hover:text-white hover:ring-none active:text-white active:bg-primary shirnk-0 whitespace-nowrap'
                onClick={() => setIsBeginOpen((prev) => !prev)}
              >
                {selectedDate.year}.{String(selectedDate.month).padStart(2, '0')}.
                {String(selectedDate.day).padStart(2, '0')}
                <CalendarIcon className='transition-colors mb-0.5' />
              </button>
            </div>
          </article>
        )}
      </section>

      <section className='py-4 space-y-2 z-0'>
        <h5 className='typo-body-5'>3. 직군을 선택해주세요.</h5>

        <div className='flex flex-wrap items-center gap-2 mt-3'>
          {jobOptions.map((option) => (
            <TextButton
              key={option}
              type='button'
              text={option}
              variant={selectedJob === option ? 'secondary' : 'assistive'}
              size='sm'
              className='px-4'
              onClick={() => setSelectedJob(option)}
            />
          ))}
        </div>
      </section>

      {isBeginOpen && (
        <DatePickerBottomSheet
          value={selectedDate}
          onClose={() => setIsBeginOpen(false)}
          onChange={setSelectedDate}
        />
      )}
    </div>
  );
};

export default BasicInfoStep;
