import clsx from 'clsx';
import { useEffect, useRef } from 'react';

const ITEM_HEIGHT = 35;
const VISIBLE_COUNT = 3;
const PADDING = Math.floor(VISIBLE_COUNT / 2) * ITEM_HEIGHT;

interface WheelSelectTimeProps<T extends string | number> {
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLoop = options.length > 2; // 오전/오후(2개)는 일반 휠, 시/분은 무한 휠 적용

  // 시, 분만 3번 복제하여 무한 스크롤 구현
  const loopOptions = isLoop ? [...options, ...options, ...options] : options;

  // 가운데 그룹에서 시작하도록 오프셋 계산
  const middleOffset = isLoop ? options.length : 0;

  // 현재 선택된 값 위치로 휠 스크롤 동기화
  useEffect(() => {
    if (!scrollRef.current) return;

    const index = options.indexOf(value);
    if (index === -1) return;

    // 프로그램에서 발생한 스크롤은 onScroll 이벤트를 무시
    isProgrammaticScroll.current = true;

    scrollRef.current.scrollTo({
      top: (middleOffset + index) * ITEM_HEIGHT,
      behavior: 'auto',
    });

    // 다음 프레임부터는 다시 사용자 스크롤을 감지
    requestAnimationFrame(() => {
      isProgrammaticScroll.current = false;
    });
  }, [value, options, middleOffset]);

  // 스크롤이 멈추면 가장 가까운 항목으로 스냅하여 선택
  const handleScroll = () => {
    if (isProgrammaticScroll.current || !scrollRef.current) return;

    clearTimeout(timeoutRef.current ?? undefined);

    timeoutRef.current = setTimeout(() => {
      if (!scrollRef.current) return;

      // 오전/오후는 기존 방식
      if (!isLoop) {
        const index = Math.round(scrollRef.current.scrollTop / ITEM_HEIGHT);
        const clamped = Math.min(Math.max(index, 0), options.length - 1);
        const selected = options[clamped];

        if (selected !== undefined && selected !== value) {
          onChange(selected);
        } else {
          scrollRef.current.scrollTo({
            top: clamped * ITEM_HEIGHT,
            behavior: 'smooth',
          });
        }

        return;
      }

      // 현재 스크롤 위치를 가장 가까운 옵션 인덱스로 변환
      let rawIndex = Math.round(scrollRef.current.scrollTop / ITEM_HEIGHT);

      // 위쪽 끝으로 가면 가운데 그룹으로 이동
      if (rawIndex < options.length / 2) {
        rawIndex += options.length;
        scrollRef.current.scrollTop = rawIndex * ITEM_HEIGHT;
      }

      // 아래쪽 끝으로 가면 가운데 그룹으로 이동
      if (rawIndex > options.length * 2.5) {
        rawIndex -= options.length;
        scrollRef.current.scrollTop = rawIndex * ITEM_HEIGHT;
      }

      const actualIndex = ((rawIndex % options.length) + options.length) % options.length;

      const selected = options[actualIndex];

      // 선택 값이 변경되면 부모 상태 업데이트
      if (selected !== undefined && selected !== value) {
        onChange(selected);
      } else {
        scrollRef.current.scrollTo({
          top: rawIndex * ITEM_HEIGHT,
          behavior: 'smooth',
        });
      }
    }, 120);
  };

  // 항목 클릭 시 해당 값으로 스크롤 + 선택
  const handleItemClick = (option: T, index: number) => {
    if (!scrollRef.current) return;

    clearTimeout(timeoutRef.current ?? undefined);

    // 무한 휠은 항상 가운데 그룹으로 이동
    const targetIndex = isLoop ? middleOffset + (index % options.length) : index;

    scrollRef.current.scrollTo({
      top: targetIndex * ITEM_HEIGHT,
      behavior: 'smooth',
    });

    if (option !== value) {
      onChange(option);
    }
  };

  // 마우스 휠 이벤트 처리
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      top: e.deltaY,
      behavior: 'smooth',
    });
  };

  const activeIndex = isLoop ? middleOffset + options.indexOf(value) : options.indexOf(value);

  return (
    <div
      className='relative flex-1 overflow-hidden'
      style={{ height: VISIBLE_COUNT * ITEM_HEIGHT }}
    >
      <div
        ref={scrollRef}
        role='listbox'
        aria-label='시간 선택'
        aria-activedescendant={`wheel-option-${activeIndex}`}
        onScroll={handleScroll}
        onWheel={handleWheel}
        className='h-full overflow-y-auto snap-y snap-mandatory hide-scrollbar'
        style={{
          paddingTop: PADDING,
          paddingBottom: PADDING,
        }}
      >
        {loopOptions.map((option, index) => (
          <button
            key={index}
            type='button'
            id={`wheel-option-${index}`}
            role='option'
            aria-selected={option === value}
            onClick={() => handleItemClick(option, index)}
            className='flex w-full items-center justify-center snap-center'
            style={{ height: ITEM_HEIGHT }}
          >
            <span
              className={clsx(
                'transition-all duration-150',
                option === value ? 'typo-body-9' : 'typo-body-10 text-neutral',
              )}
            >
              {typeof option === 'number' ? option.toString().padStart(2, '0') : option}
            </span>
          </button>
        ))}
      </div>

      <div
        aria-hidden='true'
        className='pointer-events-none absolute left-0 right-0 border-y border-neutral-400'
        style={{
          top: PADDING,
          height: ITEM_HEIGHT,
        }}
      />
    </div>
  );
};
