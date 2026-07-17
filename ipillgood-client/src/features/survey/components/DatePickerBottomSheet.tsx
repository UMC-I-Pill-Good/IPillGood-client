import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';

interface DateValue {
  year: number;
  month: number;
  day: number;
}

interface DatePickerBottomSheetProps {
  value: DateValue;
  onClose: () => void;
  onChange: (date: DateValue) => void;
}

const ITEM_HEIGHT = 48;
const VISIBLE_COUNT = 3;
const PADDING = Math.floor(VISIBLE_COUNT / 2) * ITEM_HEIGHT;

const yearOptions = Array.from({ length: 2026 - 1970 + 1 }, (_, i) => 2026 - i).reverse();
const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

interface WheelColumnProps {
  options: number[];
  value: number;
  onChange: (val: number) => void;
}

const WheelColumn = ({ options, value, onChange }: WheelColumnProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!scrollRef.current) return;
    const index = options.indexOf(value);
    if (index === -1) return;

    isProgrammaticScroll.current = true;
    scrollRef.current.scrollTo({ top: index * ITEM_HEIGHT, behavior: 'auto' });
    requestAnimationFrame(() => {
      isProgrammaticScroll.current = false;
    });
  }, [value, options]);

  const handleScroll = () => {
    if (isProgrammaticScroll.current || !scrollRef.current) return;
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (!scrollRef.current) return;
      const index = Math.round(scrollRef.current.scrollTop / ITEM_HEIGHT);
      const clamped = Math.min(Math.max(index, 0), options.length - 1);
      const selected = options[clamped];

      if (selected !== undefined && selected !== value) {
        onChange(selected);
      } else {
        scrollRef.current.scrollTo({ top: clamped * ITEM_HEIGHT, behavior: 'smooth' });
      }
    }, 120);
  };

  // 항목 클릭 시 해당 값으로 스크롤 + 선택
  const handleItemClick = (option: number, index: number) => {
    if (!scrollRef.current) return;
    clearTimeout(timeoutRef.current);
    scrollRef.current.scrollTo({ top: index * ITEM_HEIGHT, behavior: 'smooth' });

    if (option !== value) {
      onChange(option);
    }
  };

  return (
    <div
      className='relative flex-1 overflow-hidden'
      style={{ height: VISIBLE_COUNT * ITEM_HEIGHT }}
    >
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className='h-full overflow-y-auto snap-y snap-mandatory hide-scrollbar'
        style={{ paddingTop: PADDING, paddingBottom: PADDING }}
      >
        {options.map((option, index) => (
          <button
            key={option}
            type='button'
            onClick={() => handleItemClick(option, index)}
            className='flex w-full items-center justify-center snap-center'
            style={{ height: ITEM_HEIGHT }}
          >
            <span
              className={clsx(
                'transition-all duration-150 typo-body-6',
                option === value ? 'typo-body-5' : 'typo-body-6 text-neutral',
              )}
            >
              {option}
            </span>
          </button>
        ))}
      </div>

      {/* 가운데 선택 줄 표시선 - 스크롤과 무관하게 고정 */}
      <div
        className='pointer-events-none absolute left-0 right-0 border-y border-neutral-400'
        style={{ top: PADDING, height: ITEM_HEIGHT }}
      />
    </div>
  );
};

const DatePickerBottomSheet = ({ value, onClose, onChange }: DatePickerBottomSheetProps) => {
  const dayOptions = useMemo(() => {
    const days = getDaysInMonth(value.year, value.month);
    return Array.from({ length: days }, (_, i) => i + 1);
  }, [value.year, value.month]);

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
            <WheelColumn options={yearOptions} value={value.year} onChange={handleYearChange} />
            <WheelColumn options={monthOptions} value={value.month} onChange={handleMonthChange} />
            <WheelColumn options={dayOptions} value={value.day} onChange={handleDayChange} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DatePickerBottomSheet;
