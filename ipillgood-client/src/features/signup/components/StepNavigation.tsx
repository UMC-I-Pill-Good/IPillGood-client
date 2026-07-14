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

      <div className='flex items-center gap-5 mt-4'>
        <div
          className={clsx(
            'h-1 flex-1 rounded-full',
            step === 1 ? 'bg-primary-500' : 'bg-neutral-500',
          )}
        />
        <div
          className={clsx(
            'h-1 flex-1 rounded-full',
            step === 1 ? 'bg-neutral-500' : 'bg-primary-500',
          )}
        />
      </div>
    </section>
  );
};

export default StepNavigation;
