import { DateValue } from '@/features/survey/types/survey';
import { monthOptions, yearOptions } from '@/features/survey/constants/basicInfo.constants';
import { BottomSheet } from '@/shared/components';
import { WheelSelectDate } from './WeelSelectDate';

interface DatePickerBottomSheetProps {
  open: boolean;
  value: DateValue;
  onOpenChange: (open: boolean) => void;
  onChange: (date: DateValue) => void;
}

const DatePickerBottomSheet = ({
  open,
  value,
  onOpenChange,
  onChange,
}: DatePickerBottomSheetProps) => {
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

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} className='bg-white'>
      <div className='mt-8 pb-2 flex items-stretch gap-4'>
        <WheelSelectDate options={yearOptions} value={value.year} onChange={handleYearChange} />
        <WheelSelectDate options={monthOptions} value={value.month} onChange={handleMonthChange} />
        <WheelSelectDate
          options={dayOptions}
          value={value.day}
          onChange={(day) => onChange({ ...value, day })}
        />
      </div>
    </BottomSheet>
  );
};

export default DatePickerBottomSheet;
