'use client';

import { CapsuleGrayIcon, CapsuleIcon } from '@/assets';
import { getFirstDayOfWeek, isFutureDate } from '../../utils/calendar';
import { DayType } from '../../types/intakeCalendar.type';

const WEEKDAY_LABEL_LIST = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

interface CalendarGridProps {
  year: number;
  month: number;
  days: DayType[];
  onDayClick: (date: string) => void;
}

const CalendarGrid = ({ year, month, days, onDayClick }: CalendarGridProps) => {
  const firstDayOfWeek = getFirstDayOfWeek(year, month);

  return (
    <div className='grid grid-cols-7 place-items-center gap-y-2 -mx-3'>
      {WEEKDAY_LABEL_LIST.map((label) => (
        <div key={label} className='typo-caption-5 text-primary-700'>
          {label}
        </div>
      ))}

      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
        <div key={`empty-${i}`} />
      ))}

      {days.map((day) => {
        const isFuture = isFutureDate(day.date);

        return (
          <div
            key={day.date}
            onClick={day.selectable ? () => onDayClick(day.date) : undefined}
            className={`relative z-0 h-6.75 flex items-center justify-center w-6.75 typo-caption-6 ${
              isFuture ? 'text-neutral-800' : 'text-black'
            } ${day.selectable ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <div className='absolute -z-10'>
              {day.streakStatus === 'COMPLETED' ? (
                <CapsuleIcon />
              ) : day.streakStatus === 'MAINTAINED' ? (
                <CapsuleGrayIcon />
              ) : null}
            </div>
            {Number(day.date.split('-')[2])}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
