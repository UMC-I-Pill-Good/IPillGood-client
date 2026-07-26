'use client';

import { SelectionCard } from '@/shared/components';
import { clsx } from 'clsx';
import { HEALTH_SYSTEM_OPTION_LIST } from '../../constants/healthStatusOptionList';

interface HealthSystemCardGridProps {
  selectedSystemKey: string | null;
  onSelectSystem: (systemKey: string) => void;
}

/**
 * 대분류 8개 신체 계통 SelectionCard 4열 그리드 렌더링 전담 컴포넌트
 */
const HealthSystemCardGrid = ({
  selectedSystemKey,
  onSelectSystem,
}: HealthSystemCardGridProps) => {
  return (
    <section className='flex w-full justify-center px-5 py-4 box-border'>
      {/* 팀원 피드백: max 너비(max-w-[349px]) 제거 */}
      <div className='grid w-full grid-cols-4 gap-2'>
        {HEALTH_SYSTEM_OPTION_LIST.map((system) => {
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
