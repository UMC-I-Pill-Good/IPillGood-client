import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className='flex min-h-[80vh] flex-col items-center justify-center gap-4'>
      <Loader2 className='text-primary size-10 animate-spin' />

      <p className='typo-body-10 text-neutral'>데이터를 불러오고 있습니다...</p>
    </div>
  );
};

export default LoadingSpinner;
