'use client';

import { MascotSadIcon } from '@/assets';
import { FetchError, LoadMoreError, LoadingSpinner, TextButton } from '@/shared/components';
import { Header } from '@/shared/layout';
import SupplementDetailSummaryCard from '@/features/ranking/components/detail/SupplementDetailSummaryCard';
import { useProductReviews } from '../hooks/useProductReviews';
import ReviewCard from './ReviewCard';
import ReviewSortDropdown from './ReviewSortDropdown';

interface ReviewListProps {
  productId: number;
}

const ReviewList = ({ productId }: ReviewListProps) => {
  const {
    sort,
    setSort,
    productQuery,
    reviewQuery,
    reviewList,
    reviewCount,
    isPending,
    isInitialError,
    handleRetry,
  } = useProductReviews(productId);

  return (
    <main className='min-h-dvh bg-background pb-20' data-product-id={productId}>
      <Header title='후기 보기' />
      {productQuery.data && (
        <section className='px-5 pb-2 pt-4'>
          <SupplementDetailSummaryCard product={productQuery.data} showReviewButton={false} />
        </section>
      )}
      {isPending && <LoadingSpinner />}
      {isInitialError && (
        <FetchError description='후기 정보를 불러오지 못했습니다.' onRetry={handleRetry} />
      )}
      {productQuery.data && reviewQuery.data && (
        <section className='flex flex-col gap-2 px-5 py-4'>
          <div className='flex items-center justify-between'>
            <h2 className='typo-title-gosanja text-[18px] font-normal leading-normal text-black'>
              전체 후기 <span className='typo-caption-6 text-neutral-800'>{reviewCount}개</span>
            </h2>
            <ReviewSortDropdown sort={sort} onChange={setSort} />
          </div>
          {reviewList.length === 0 ? (
            <div className='flex min-h-130 flex-col items-center justify-center gap-6 pb-12'>
              <MascotSadIcon aria-hidden='true' className='h-70 w-55' />
              <p className='typo-body-6 text-primary-600'>아직 후기가 존재하지 않아요...</p>
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              {reviewList.map((review) => (
                <ReviewCard key={review.reviewId} review={review} productId={productId} />
              ))}
              {reviewQuery.isFetchNextPageError ? (
                <LoadMoreError
                  message='후기를 추가로 불러오지 못했습니다.'
                  onRetry={() => void reviewQuery.fetchNextPage()}
                />
              ) : reviewQuery.hasNextPage ? (
                <TextButton
                  type='button'
                  text={reviewQuery.isFetchingNextPage ? '불러오는 중...' : '후기 더보기'}
                  variant='assistive'
                  size='sm'
                  disabled={reviewQuery.isFetchingNextPage}
                  className='mx-auto mt-2 px-5'
                  onClick={() => reviewQuery.fetchNextPage()}
                />
              ) : null}
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default ReviewList;
