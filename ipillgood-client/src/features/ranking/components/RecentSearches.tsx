'use client';

import CrossSmallIcon from '@/assets/icons/fi-rr-cross-small.svg';

interface RecentSearchesProps {
  searches: string[];
  onRemove: (searchTerm: string) => void;
  onClear: () => void;
}

const RecentSearches = ({
  searches,
  onRemove,
  onClear,
}: RecentSearchesProps) => {
  if (searches.length === 0) return null;

  return (
    <section className='flex w-full flex-col gap-1 px-5 pb-4 pt-2'>
      <div className='flex w-full items-center justify-between'>
        <h2 className='typo-caption-1 text-black'>최근 검색어</h2>
        <button
          type='button'
          className='typo-caption-7 text-neutral-800'
          onClick={onClear}
        >
          전체 초기화
        </button>
      </div>

      <div className='flex flex-wrap items-center gap-3'>
        {searches.map((searchTerm) => (
          <div
            key={searchTerm}
            className='flex h-8 items-start justify-end'
          >
            <span className='ranking-chip-glass inline-flex h-8 items-center justify-center rounded-full px-4 typo-caption-2 text-neutral-800'>
              {searchTerm}
            </span>
            <button
              type='button'
              aria-label={`${searchTerm} 최근 검색어 삭제`}
              className='inline-flex size-4 shrink-0 items-center justify-center text-neutral-800'
              onClick={() => onRemove(searchTerm)}
            >
              <CrossSmallIcon aria-hidden='true' className='size-4' />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentSearches;
