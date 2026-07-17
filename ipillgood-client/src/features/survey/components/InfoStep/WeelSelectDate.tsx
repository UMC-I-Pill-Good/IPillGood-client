import clsx from 'clsx';
import { useEffect, useRef } from 'react';

const ITEM_HEIGHT = 48;
const VISIBLE_COUNT = 3;
const PADDING = Math.floor(VISIBLE_COUNT / 2) * ITEM_HEIGHT;

interface WheelColumnProps {
  options: number[];
  value: number;
  onChange: (val: number) => void;
}

export const WheelSelectDate = ({ options, value, onChange }: WheelColumnProps) => {
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
