'use client';

import Link from 'next/link';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorProps) => {
  return (
    <main className='min-h-dvh flex items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-2 break-keep'>문제가 발생했습니다</h1>
        <p className='text-sm sm:text-base text-secondary mb-4 break-keep'>
          예상치 못한 오류가 발생했습니다.
        </p>

        <p className='text-xs sm:text-sm text-muted mb-6 break-all'>
          {error?.message || '알 수 없는 오류'}
        </p>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <button
            onClick={() => reset()}
            className='w-full sm:w-auto rounded-interactive-default bg-accent-peak px-4 py-2 text-white'
          >
            다시 시도
          </button>

          <Link
            href='/feed'
            className='w-full sm:w-auto rounded-interactive-default border border-outline px-4 py-2'
          >
            메인으로
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
