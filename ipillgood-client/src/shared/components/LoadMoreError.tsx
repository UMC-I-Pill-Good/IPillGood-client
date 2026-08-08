import { TriangleAlert } from 'lucide-react';
import TextButton from './button/TextButton';

interface LoadMoreErrorProps {
  message: string;
  onRetry: () => void;
}

const LoadMoreError = ({ message, onRetry }: LoadMoreErrorProps) => (
  <div
    role='alert'
    className='flex w-full items-center justify-between gap-3 rounded-lg bg-white/60 px-4 py-3'
  >
    <div className='flex min-w-0 items-center gap-2'>
      <TriangleAlert aria-hidden='true' className='size-5 shrink-0 text-semantic-500' />
      <p className='typo-caption-2 text-neutral-800'>{message}</p>
    </div>
    <TextButton text='다시 시도' variant='semanticOutline' size='sm' onClick={onRetry} />
  </div>
);

export default LoadMoreError;
