'use client';

import { useIntakeCalendar } from '../../hooks/useIntakeCalendar';
import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';
import DayIntakeListModal from './DayIntakeListModal';

const IntakeCalendarSection = () => {
  const {
    year,
    month,
    days,
    isPending,
    selectedDate,
    setSelectedDate,
    handlePrevMonth,
    handleNextMonth,
  } = useIntakeCalendar();

  return (
    <section className='mt-8 w-full flex flex-col gap-2'>
      <h2 className='typo-body-5 text-black'>영양제 복용 캘린더</h2>
      <section className='flex flex-col gap-2 bg-white/50 border border-white rounded-[20px] px-3 py-2 shadow-[0px_4px_4px_0px_rgba(126,131,135,0.10)]'>
        <CalendarHeader month={month} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} />
        {isPending ? (
          <div className='h-48 animate-pulse bg-neutral-100 rounded-lg' />
        ) : (
          <CalendarGrid year={year} month={month} days={days} onDayClick={setSelectedDate} />
        )}
      </section>
      {selectedDate && (
        <DayIntakeListModal date={selectedDate} onClose={() => setSelectedDate(null)} />
      )}
    </section>
  );
};

export default IntakeCalendarSection;
