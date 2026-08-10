import { TextButton } from '@/shared/components';
import { TriangleAlert } from 'lucide-react';
import { cn } from '../utils';

interface ErrorScreenProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

const FetchError = ({
  title = '문제가 발생했어요',
  description = '잠시 후 다시 시도해주세요.',
  onRetry,
  className,
}: ErrorScreenProps) => {
  return (
    <div
      role='alert'
      className={cn(
        'flex min-h-[80vh] flex-col items-center justify-center gap-3 px-6 text-center',
        className,
      )}
    >
      <TriangleAlert className='text-semantic size-10' />

      <div className='space-y-1'>
        <h2 className='typo-body-5'>{title}</h2>
        <p className='typo-body-11 text-neutral'>{description}</p>
      </div>

      {onRetry && (
        <TextButton
          text='다시 시도'
          variant='primary'
          size='lg'
          onClick={onRetry}
          className='w-60'
        />
      )}
    </div>
  );
};

export default FetchError;
