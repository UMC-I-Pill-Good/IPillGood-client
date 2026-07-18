'use client';

import { useRef, type UIEvent } from 'react';
import { clsx } from 'clsx';

interface TimeWheelPickerProps {
  values: number[];
  selectedValue: number;
  onSelectValue: (value: number) => void;
  ariaLabel: string;
}

const TimeWheelPicker = ({
  values,
  selectedValue,
  onSelectValue,
  ariaLabel,
}: TimeWheelPickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const itemHeight = 32; // 개별 행 높이 32px
    const index = Math.round(container.scrollTop / itemHeight);
    const clampedIndex = Math.max(0, Math.min(index, values.length - 1));
    const newValue = values[clampedIndex];

    if (newValue !== undefined && newValue !== selectedValue) {
      onSelectValue(newValue);
    }
  };

  const handleItemClick = (value: number, index: number) => {
    onSelectValue(value);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * 32,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      role='listbox'
      aria-label={ariaLabel}
      onScroll={handleScroll}
      className='hide-scrollbar flex h-24 w-[87px] snap-y snap-mandatory flex-col overflow-y-auto scroll-smooth py-8'
    >
      {values.map((value, index) => {
        const isSelected = value === selectedValue;

        return (
          <button
            key={value}
            type='button'
            role='option'
            aria-selected={isSelected}
            onClick={() => handleItemClick(value, index)}
            className={clsx(
              'flex h-8 w-full shrink-0 snap-center flex-col items-center justify-center gap-2.5 px-2.5 py-1 transition-colors',
              /* 선택된 항목 위아래 구분선 바 표시 */
              isSelected
                ? 'border-y border-[#C1C6CB] text-[#3474FF]'
                : 'border-y border-transparent text-[#7E8387]',
            )}
          >
            <span className='text-center text-xl font-medium leading-normal' style={{ fontFamily: 'Pretendard, sans-serif' }}>
              {value}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TimeWheelPicker;
