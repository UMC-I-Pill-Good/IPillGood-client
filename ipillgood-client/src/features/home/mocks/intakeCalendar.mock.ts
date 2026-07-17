import type { CalendarMonthType, CalendarDayType } from '../types/intakeCalendar.type';

const dayPattern: CalendarDayType['status'][] = [
  'DONE',
  'DONE',
  'PARTIAL',
  'NONE',
  'DONE',
  'PARTIAL',
  'DONE',
];

const days: CalendarDayType[] = Array.from({ length: 31 }, (_, i) => {
  const date = i + 1;
  const isFuture = date > 15;
  const status = isFuture ? 'NONE' : dayPattern[i % dayPattern.length];
  const totalCount = 5;
  const takenCount = isFuture ? 0 : status === 'DONE' ? 5 : status === 'PARTIAL' ? 3 : 0;

  return {
    date: `2026-07-${String(date).padStart(2, '0')}`,
    status,
    takenCount,
    totalCount,
  };
});

export const mockIntakeCalendar: CalendarMonthType = {
  year: 2026,
  month: 7,
  days,
};
