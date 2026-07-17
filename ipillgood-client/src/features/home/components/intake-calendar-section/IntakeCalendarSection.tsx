'use client';

import CalendarGrid from './CalendarGrid';
import CalendarHeader from './CalendarHeader';
import DayIntakeListModal from './DayIntakeListModal';
import { useIntakeCalendar } from '../../hooks/useIntakeCalendar';

const IntakeCalendarSection = () => {
  const { year, month, days, selectedDate, setSelectedDate, selectedDayDetail } =
    useIntakeCalendar();

  return (
    <div className='mt-8 w-full flex flex-col gap-2'>
      <h2 className='typo-body-5 text-[#111111]'>영양제 복용 캘린더</h2>
      <div className='flex flex-col gap-2 bg-white/50 border border-white rounded-[20px] px-3 py-2 shadow-[0px_4px_4px_0px_rgba(126,131,135,0.10)]'>
        {/* TODO: 월 이동 */}
        <CalendarHeader month={month} onPrevMonth={() => {}} onNextMonth={() => {}} />
        <CalendarGrid year={year} month={month} days={days} onDayClick={setSelectedDate} />
      </div>
      {selectedDate && selectedDayDetail && (
        <DayIntakeListModal
          date={selectedDate}
          intakes={selectedDayDetail.intakes}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
};

export default IntakeCalendarSection;
