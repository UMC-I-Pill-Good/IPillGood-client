import clsx from 'clsx';
import { useEffect, useRef } from 'react';

const ITEM_HEIGHT = 48;
const VISIBLE_COUNT = 3;
const PADDING = Math.floor(VISIBLE_COUNT / 2) * ITEM_HEIGHT;

interface WheelSelectTimeProps<T> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
}

export const WheelSelectTime = <T extends string | number>({
  options,
  value,
  onChange,
}: WheelSelectTimeProps<T>) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // 현재 선택된 값 위치로 휠 스크롤 동기화
  useEffect(() => {
    if (!scrollRef.current) return;
    const index = options.indexOf(value);
    if (index === -1) return;

    // 프로그램에서 발생한 스크롤은 onScroll 이벤트를 무시
    isProgrammaticScroll.current = true;
    scrollRef.current.scrollTo({ top: index * ITEM_HEIGHT, behavior: 'auto' });

    // 다음 프레임부터는 다시 사용자 스크롤을 감지
    requestAnimationFrame(() => {
      isProgrammaticScroll.current = false;
    });
  }, [value, options]);

  // 스크롤이 멈추면 가장 가까운 항목으로 스냅하여 선택
  const handleScroll = () => {
    if (isProgrammaticScroll.current || !scrollRef.current) return;
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (!scrollRef.current) return;

      // 현재 스크롤 위치를 가장 가까운 옵션 인덱스로 변환
      const index = Math.round(scrollRef.current.scrollTop / ITEM_HEIGHT);
      const clamped = Math.min(Math.max(index, 0), options.length - 1);
      const selected = options[clamped];

      // 선택 값이 변경되면 부모 상태 업데이트
      if (selected !== undefined && selected !== value) {
        onChange(selected);
      } else {
        scrollRef.current.scrollTo({ top: clamped * ITEM_HEIGHT, behavior: 'smooth' });
      }
    }, 120);
  };

  const handleItemClick = (option: T, index: number) => {
    if (!scrollRef.current) return;

    clearTimeout(timeoutRef.current);

    scrollRef.current.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: 'smooth',
    });

    if (option !== value) {
      onChange(option);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    scrollRef.current.scrollBy({ top: e.deltaY, behavior: 'smooth' });
  };

  return (
    <div
      className='relative flex-1 overflow-hidden'
      style={{ height: VISIBLE_COUNT * ITEM_HEIGHT }}
    >
      <div
        ref={scrollRef}
        role='listbox'
        aria-label='날짜 선택'
        aria-activedescendant={`wheel-option-${value}`}
        onScroll={handleScroll}
        onWheel={handleWheel}
        className='h-full overflow-y-auto snap-y snap-mandatory hide-scrollbar'
        style={{ paddingTop: PADDING, paddingBottom: PADDING }}
      >
        {options.map((option, index) => (
          <button
            key={option}
            type='button'
            id={`wheel-option-${option}`}
            role='option'
            aria-selected={option === value}
            onClick={() => handleItemClick(option, index)}
            className='flex w-full items-center justify-center snap-center'
            style={{ height: ITEM_HEIGHT }}
          >
            <span
              className={clsx(
                'transition-all duration-150',
                option === value ? 'typo-body-5' : 'typo-body-6 text-neutral',
              )}
            >
              {option}
            </span>
          </button>
        ))}
      </div>

      <div
        aria-hidden='true'
        className='pointer-events-none absolute left-0 right-0 border-y border-neutral-400'
        style={{ top: PADDING, height: ITEM_HEIGHT }}
      />
    </div>
  );
};
