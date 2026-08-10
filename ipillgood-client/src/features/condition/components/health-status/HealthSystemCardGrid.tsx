'use client';

import { SelectionCard } from '@/shared/components';
import { clsx } from 'clsx';
import { type HealthSystemType } from '../../types/healthStatus';

interface HealthSystemCardGridProps {
  systemList: HealthSystemType[];
  isLoading: boolean;
  selectedSystemKey: string | null;
  onSelectSystem: (systemKey: string) => void;
}

const HealthSystemCardGrid = ({
  systemList,
  isLoading,
  selectedSystemKey,
  onSelectSystem,
}: HealthSystemCardGridProps) => {
  return (
    <section className='flex w-full justify-center px-5 py-4 box-border'>
      <div
        className='grid w-full grid-cols-4 gap-2'
        aria-label={isLoading ? '건강 상태 분류를 불러오는 중' : undefined}
        aria-busy={isLoading || undefined}
      >
        {isLoading &&
          Array.from({ length: 8 }, (_, index) => (
            <div
              key={`health-system-skeleton-${index}`}
              className='flex h-[110px] w-full flex-col items-center justify-center gap-3 rounded-2xl bg-white/60 motion-safe:animate-pulse motion-safe:[animation-duration:1s]'
              aria-hidden='true'
            >
              <span className='size-8 rounded-full bg-neutral-200' />
              <span className='h-3 w-10 rounded-full bg-neutral-200' />
            </div>
          ))}

        {systemList.map((system) => {
          const isSelected = selectedSystemKey === system.key;
          const isTwoLine12px = Boolean(system.isTwoLine);

          return (
            <SelectionCard
              key={system.key}
              id={system.key}
              label={system.label}
              icon={system.icon}
              isSelected={isSelected}
              onClick={onSelectSystem}
              className={clsx(
                'w-full h-[110px] border border-white transition-all duration-200',
                isSelected
                  ? 'text-white! [&_span:last-child]:text-white! [&_span:last-child]:font-semibold border-transparent'
                  : 'bg-white/60! text-black! [&_span:last-child]:text-black!',
                isTwoLine12px
                  ? '[&_span:last-child]:text-xs! [&_span:last-child]:leading-[1.2] [&_span:last-child]:whitespace-pre-line! [&_span:last-child]:text-center!'
                  : '[&_span:last-child]:text-sm! [&_span:last-child]:leading-tight [&_span:last-child]:whitespace-nowrap!',
              )}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HealthSystemCardGrid;
