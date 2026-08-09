'use client';

import { useEffect, useRef } from 'react';
import { clsx } from 'clsx';

interface TimeWheelPickerProps {
  values: number[];
  selectedValue: number;
  onSelectValue: (value: number) => void;
  ariaLabel: string;
}

const ITEM_HEIGHT = 32;

const TimeWheelPicker = ({
  values,
  selectedValue,
  onSelectValue,
  ariaLabel,
}: TimeWheelPickerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // 선택된 값 변경 시 스크롤 위치 자동 동기화
  useEffect(() => {
    if (!containerRef.current) return;
    const index = values.indexOf(selectedValue);
    if (index === -1) return;

    isProgrammaticScroll.current = true;
    containerRef.current.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: 'auto',
    });

    requestAnimationFrame(() => {
      isProgrammaticScroll.current = false;
    });
  }, [selectedValue, values]);

  // 스크롤 멈춤 감지(120ms 디바운스) 및 가장 가까운 항목 자동 선택 & 중앙 스냅
  const handleScroll = () => {
    if (isProgrammaticScroll.current || !containerRef.current) return;
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (!containerRef.current) return;
      const index = Math.round(containerRef.current.scrollTop / ITEM_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, values.length - 1));
      const newValue = values[clampedIndex];

      if (newValue !== undefined && newValue !== selectedValue) {
        onSelectValue(newValue);
      } else {
        containerRef.current.scrollTo({
          top: clampedIndex * ITEM_HEIGHT,
          behavior: 'smooth',
        });
      }
    }, 120);
  };

  const handleItemClick = (value: number, index: number) => {
    if (!containerRef.current) return;
    clearTimeout(timeoutRef.current);

    containerRef.current.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: 'smooth',
    });

    if (value !== selectedValue) {
      onSelectValue(value);
    }
  };

  return (
    <div className='relative h-24 w-[87px]'>
      <div className='pointer-events-none absolute left-0 right-0 top-8 bottom-8 border-y border-neutral-500' />

      <div
        ref={containerRef}
        role='listbox'
        aria-label={ariaLabel}
        onScroll={handleScroll}
        className='hide-scrollbar flex h-full w-full snap-y snap-mandatory flex-col overflow-y-auto scroll-smooth py-8'
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
                isSelected ? 'text-[#3474FF]' : 'text-neutral-800',
              )}
            >
              <span
                className='text-center text-xl font-medium leading-normal'
                style={{ fontFamily: 'Pretendard, sans-serif' }}
              >
                {value}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeWheelPicker;
