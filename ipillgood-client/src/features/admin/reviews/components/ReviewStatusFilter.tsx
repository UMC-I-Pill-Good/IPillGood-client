import { cn } from '@/shared/utils/cn';

import { REPORT_STATUS_FILTER_LIST } from '../constants/ReviewReport';
import type { ReportStatusFilterType } from '../types/ReviewReport';

interface ReviewStatusFilterProps {
  value: ReportStatusFilterType;
  onChange: (value: ReportStatusFilterType) => void;
}

const ReviewStatusFilter = ({ value, onChange }: ReviewStatusFilterProps) => {
  return (
    <div role='group' aria-label='후기 신고 처리 상태' className='flex shrink-0 items-end gap-2'>
      {REPORT_STATUS_FILTER_LIST.map((filter) => {
        const isSelected = filter.value === value;

        return (
          <button
            key={filter.value}
            type='button'
            aria-pressed={isSelected}
            onClick={() => onChange(filter.value)}
            className='flex w-[114px] flex-col items-center gap-2'
          >
            <span className='w-full text-center text-lg font-medium leading-5 text-black'>
              {filter.label}
            </span>
            <span
              aria-hidden='true'
              className={cn(
                'h-1 w-full rounded-full',
                isSelected ? 'bg-primary' : 'bg-neutral-500',
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default ReviewStatusFilter;
