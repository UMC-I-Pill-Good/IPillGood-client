import { IconButton } from '@/shared/components';
import clsx from 'clsx';
import { ChevronLeft } from 'lucide-react';

interface StepNavigationProps {
  step: number;
  onBack: () => void;
}

const StepNavigation = ({ step, onBack }: StepNavigationProps) => {
  return (
    <section>
      <IconButton icon={<ChevronLeft size={26} />} ariaLabel='뒤로 가기' onClick={onBack} />

      <div className='mt-4 flex items-center gap-5'>
        {[1, 2].map((item) => (
          <div
            key={item}
            className={clsx(
              'h-1 flex-1 rounded-full',
              step >= item ? 'bg-primary-600' : 'bg-neutral-500',
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default StepNavigation;
