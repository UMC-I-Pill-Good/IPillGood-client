'use client';

import clsx from 'clsx';
import { useEffect, useId, useRef } from 'react';

type WheelPickerValue = string | number;

interface WheelPickerProps<T extends WheelPickerValue> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  itemHeight: number;
  loop?: boolean;
  selectedClassName: string;
  unselectedClassName: string;
}

const VISIBLE_COUNT = 3;

const formatOption = (option: WheelPickerValue) =>
  typeof option === 'number' ? option.toString().padStart(2, '0') : option;

const WheelPicker = <T extends WheelPickerValue>({
  options,
  value,
  onChange,
  ariaLabel,
  itemHeight,
  loop = false,
  selectedClassName,
  unselectedClassName,
}: WheelPickerProps<T>) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const optionIdPrefix = useId();
  const padding = Math.floor(VISIBLE_COUNT / 2) * itemHeight;
  const isLooping = loop && options.length > 2;
  const renderedOptions = isLooping ? [...options, ...options, ...options] : options;
  const middleOffset = isLooping ? options.length : 0;

  const valueIndex = options.indexOf(value);

  useEffect(() => {
    if (!scrollRef.current || valueIndex === -1) return;

    isProgrammaticScroll.current = true;

    scrollRef.current.scrollTo({
      top: (middleOffset + valueIndex) * itemHeight,
      behavior: 'auto',
    });

    requestAnimationFrame(() => {
      isProgrammaticScroll.current = false;
    });
  }, [itemHeight, middleOffset, valueIndex]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const snapToNearestOption = () => {
    if (!scrollRef.current) return;

    let index = Math.round(scrollRef.current.scrollTop / itemHeight);

    if (isLooping) {
      if (index < options.length / 2) {
        index += options.length;
      } else if (index > options.length * 2.5) {
        index -= options.length;
      }
      scrollRef.current.scrollTop = index * itemHeight;
    } else {
      index = Math.min(Math.max(index, 0), options.length - 1);
    }

    const selectedIndex = isLooping
      ? ((index % options.length) + options.length) % options.length
      : index;
    const selected = options[selectedIndex];

    if (selected !== undefined && selected !== value) {
      onChange(selected);
      return;
    }

    scrollRef.current.scrollTo({ top: index * itemHeight, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (isProgrammaticScroll.current || !scrollRef.current) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(snapToNearestOption, 120);
  };

  const handleItemClick = (option: T, index: number) => {
    if (!scrollRef.current) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const targetIndex = isLooping ? middleOffset + (index % options.length) : index;
    scrollRef.current.scrollTo({ top: targetIndex * itemHeight, behavior: 'smooth' });

    if (option !== value) onChange(option);
  };

  const activeIndex = isLooping ? middleOffset + options.indexOf(value) : options.indexOf(value);

  return (
    <div className='relative flex-1 overflow-hidden' style={{ height: VISIBLE_COUNT * itemHeight }}>
      <div
        ref={scrollRef}
        role='listbox'
        tabIndex={0}
        aria-label={ariaLabel}
        aria-activedescendant={`${optionIdPrefix}-option-${activeIndex}`}
        onScroll={handleScroll}
        onWheel={(event) => {
          scrollRef.current?.scrollBy({ top: event.deltaY, behavior: 'smooth' });
        }}
        className='h-full overflow-y-auto snap-y snap-mandatory hide-scrollbar'
        style={{ paddingTop: padding, paddingBottom: padding }}
      >
        {renderedOptions.map((option, index) => (
          <button
            key={`${option}-${index}`}
            type='button'
            id={`${optionIdPrefix}-option-${index}`}
            role='option'
            aria-selected={option === value}
            onClick={() => handleItemClick(option, index)}
            className='flex w-full items-center justify-center snap-center'
            style={{ height: itemHeight }}
          >
            <span
              className={clsx(
                'transition-all duration-150',
                option === value ? selectedClassName : unselectedClassName,
              )}
            >
              {formatOption(option)}
            </span>
          </button>
        ))}
      </div>

      <div
        aria-hidden='true'
        className='pointer-events-none absolute left-0 right-0 border-y border-neutral-400'
        style={{ top: padding, height: itemHeight }}
      />
    </div>
  );
};

export default WheelPicker;
