import { DateValue } from '@/features/survey/types/survey';
import { monthOptions, yearOptions } from '@/features/survey/constants/basicInfo.constants';
import { BottomSheet, TextButton, WheelPicker } from '@/shared/components';

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
  const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate(); // 선택한 연도/월에 맞는 날짜 개수 계산

  // 선택한 연도와 월에 맞는 날짜 목록 생성
  const dayOptions = Array.from(
    { length: getDaysInMonth(value.year, value.month) },
    (_, i) => i + 1,
  );

  // 연도 변경 시 해당 월의 최대 일수를 넘지 않도록 보정
  const handleYearChange = (year: number) => {
    const maxDay = getDaysInMonth(year, value.month);
    onChange({ ...value, year, day: Math.min(value.day, maxDay) });
  };

  // 월 변경 시 해당 월의 최대 일수를 넘지 않도록 보정
  const handleMonthChange = (month: number) => {
    const maxDay = getDaysInMonth(value.year, month);
    onChange({ ...value, month, day: Math.min(value.day, maxDay) });
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <div className='mt-8 mb-5 flex items-stretch gap-4'>
        <WheelPicker
          ariaLabel='출생 연도 선택'
          itemHeight={48}
          selectedClassName='typo-body-5'
          unselectedClassName='typo-body-6 text-neutral'
          options={yearOptions}
          value={value.year}
          onChange={handleYearChange}
        />
        <WheelPicker
          ariaLabel='출생 월 선택'
          itemHeight={48}
          selectedClassName='typo-body-5'
          unselectedClassName='typo-body-6 text-neutral'
          options={monthOptions}
          value={value.month}
          onChange={handleMonthChange}
        />
        <WheelPicker
          ariaLabel='출생 일 선택'
          itemHeight={48}
          selectedClassName='typo-body-5'
          unselectedClassName='typo-body-6 text-neutral'
          options={dayOptions}
          value={value.day}
          onChange={(day) => onChange({ ...value, day })}
        />
      </div>

      <TextButton
        type='submit'
        text='선택 완료'
        size='xl'
        className=' w-full'
        onClick={() => onOpenChange(false)}
      />
    </BottomSheet>
  );
};

export default DatePickerBottomSheet;
