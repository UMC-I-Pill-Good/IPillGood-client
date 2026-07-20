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
  const isProgrammaticScroll = useRef(false); // 값 변경으로 인한 스크롤인지, 사용자 스크롤인지 구분하기 위한 플래그
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
    clearTimeout(timeoutRef.current); // 스크롤 중에는 타이머를 계속 초기화하여 마지막 이벤트만 처리

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
        scrollRef.current.scrollTo({ top: clamped * ITEM_HEIGHT, behavior: 'smooth' }); // 이미 선택된 값이라면 중앙으로 다시 정렬
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
