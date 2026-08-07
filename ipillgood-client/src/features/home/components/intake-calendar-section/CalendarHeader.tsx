'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader = ({ month, onPrevMonth, onNextMonth }: CalendarHeaderProps) => {
  return (
    <div className='flex justify-between items-center'>
      <button type='button' onClick={onPrevMonth} aria-label='이전 달'>
        <ChevronLeft size={20} className='text-neutral-800' />
      </button>
      <p className='text-black typo-body-10'>{month}월</p>
      <button type='button' onClick={onNextMonth} aria-label='다음 달'>
        <ChevronRight size={20} className='text-neutral-800' />
      </button>
    </div>
  );
};

export default CalendarHeader;
