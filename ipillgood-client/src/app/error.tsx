'use client';

import Link from 'next/link';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <main className='flex min-h-screen items-center justify-center bg-white px-4'>
      <div className='w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm'>
        <h1 className='mb-2 text-2xl font-bold text-gray-900 sm:text-3xl'>문제가 발생했습니다</h1>

        <p className='mb-4 text-sm text-gray-600 sm:text-base'>예상치 못한 오류가 발생했습니다.</p>

        <p className='mb-8 break-all rounded-lg bg-gray-100 p-3 font-mono text-xs text-gray-500 sm:text-sm'>
          {error?.message || '알 수 없는 오류'}
        </p>

        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <button
            onClick={reset}
            className='rounded-lg bg-black px-5 py-2.5 font-medium text-white transition hover:bg-gray-800 active:scale-95'
          >
            다시 시도
          </button>

          <Link
            href='/'
            className='rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100'
          >
            메인으로
          </Link>
        </div>
      </div>
    </main>
  );
}
