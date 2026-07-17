import { IconButton } from '@/shared/components';
import clsx from 'clsx';
import { ChevronLeft, X } from 'lucide-react';

interface StepNavigationProps {
  step: number;
  onBack: () => void;
}

const StepNavigation = ({ step, onBack }: StepNavigationProps) => {
  return (
    <section>
      <article className='flex items-center justify-between'>
        <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' onClick={onBack} />
        <IconButton icon={<X size={26} />} ariaLabel='취소 모달 열기' onClick={onBack} />
      </article>

      <article className='mt-4 flex items-center gap-5'>
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className={clsx(
              'h-1 flex-1 rounded-full',
              step >= item ? 'bg-primary' : 'bg-neutral-500',
            )}
          />
        ))}
      </article>
    </section>
  );
};

export default StepNavigation;
