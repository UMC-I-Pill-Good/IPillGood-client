import { AnimatePresence, motion } from 'framer-motion';
import { WheelSelectDate } from './WeelSelectDate';
import { DateValue } from '@/features/survey/types/survey';
import { monthOptions, yearOptions } from '@/features/survey/constants/basicInfo.constants';

interface DatePickerBottomSheetProps {
  value: DateValue;
  onClose: () => void;
  onChange: (date: DateValue) => void;
}

const DatePickerBottomSheet = ({ value, onClose, onChange }: DatePickerBottomSheetProps) => {
  const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

  const dayOptions = Array.from(
    { length: getDaysInMonth(value.year, value.month) },
    (_, i) => i + 1,
  );

  const handleYearChange = (year: number) => {
    const maxDay = getDaysInMonth(year, value.month);
    onChange({ ...value, year, day: Math.min(value.day, maxDay) });
  };

  const handleMonthChange = (month: number) => {
    const maxDay = getDaysInMonth(value.year, month);
    onChange({ ...value, month, day: Math.min(value.day, maxDay) });
  };

  const handleDayChange = (day: number) => {
    onChange({ ...value, day });
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/30' onClick={onClose}>
      <AnimatePresence>
        <motion.div
          className='absolute bottom-0 left-0 right-0 max-w-110 mx-auto w-full rounded-t-4xl bg-white pb-8 shadow-[0_-4px_20px_rgba(126,131,135,0.20)]'
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 핸들 바 - 클릭하면 닫힘 */}
          <button
            type='button'
            onClick={onClose}
            className='mx-auto flex py-2.5 w-full items-center justify-center'
          >
            <div className='h-1 w-38 rounded-full bg-neutral-500' />
          </button>

          <div className='flex items-stretch gap-4 px-5 mt-6'>
            <WheelSelectDate options={yearOptions} value={value.year} onChange={handleYearChange} />
            <WheelSelectDate
              options={monthOptions}
              value={value.month}
              onChange={handleMonthChange}
            />
            <WheelSelectDate options={dayOptions} value={value.day} onChange={handleDayChange} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DatePickerBottomSheet;
