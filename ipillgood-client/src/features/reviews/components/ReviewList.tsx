'use client';

import { useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { MascotSadIcon } from '@/assets';
import { FetchError, LoadingSpinner, TextButton } from '@/shared/components';
import { Header } from '@/shared/layout';
import { getRankingProductDetail } from '@/features/ranking/api/getRankingProductDetail';
import SupplementDetailSummaryCard from '@/features/ranking/components/detail/SupplementDetailSummaryCard';
import { getProductReviews } from '../api/getProductReviews';
import type { ReviewSort } from '../types/review';
import ReviewCard from './ReviewCard';
import ReviewSortDropdown from './ReviewSortDropdown';

interface ReviewListProps {
  productId: number;
}

const ReviewList = ({ productId }: ReviewListProps) => {
  const [sort, setSort] = useState<ReviewSort>('LATEST');
  const productQuery = useQuery({
    queryKey: ['review-product', productId],
    queryFn: async () => {
      const response = await getRankingProductDetail(productId);
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message);
      }
      return response.result;
    },
  });
  const reviewQuery = useInfiniteQuery({
    queryKey: ['product-reviews', productId, sort],
    queryFn: async ({ pageParam }) => {
      const response = await getProductReviews({ productId, sort, size: 20, cursor: pageParam });
      if (!response.isSuccess || !response.result) {
        throw new Error(response.message);
      }
      return response.result;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && lastPage.nextCursor ? lastPage.nextCursor : undefined,
  });
  const reviewList = reviewQuery.data?.pages.flatMap((page) => page.reviews) ?? [];
  const reviewCount = reviewQuery.data?.pages[0]?.reviewCount ?? 0;
  const isPending = productQuery.isPending || reviewQuery.isPending;
  const isError = productQuery.isError || reviewQuery.isError;

  const handleRetry = () => {
    void Promise.all([productQuery.refetch(), reviewQuery.refetch()]);
  };

  return (
    <main className='min-h-dvh bg-background pb-20' data-product-id={productId}>
      <Header title='후기 보기' />
      {productQuery.data && (
        <section className='px-5 pb-2 pt-4'>
          <SupplementDetailSummaryCard product={productQuery.data} showReviewButton={false} />
        </section>
      )}
      {isPending && <LoadingSpinner />}
      {isError && (
        <FetchError description='후기 정보를 불러오지 못했습니다.' onRetry={handleRetry} />
      )}
      {productQuery.data && reviewQuery.data && (
        <section className='flex flex-col gap-2 px-5 py-4'>
          <div className='flex items-center justify-between'>
            <h2 className='typo-body-5 text-black'>
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
                <ReviewCard
                  key={review.reviewId}
                  review={review}
                  productId={productId}
                  onDelete={() => void reviewQuery.refetch()}
                />
              ))}
              {reviewQuery.hasNextPage && (
                <TextButton
                  type='button'
                  text={reviewQuery.isFetchingNextPage ? '불러오는 중...' : '후기 더보기'}
                  variant='assistive'
                  size='sm'
                  disabled={reviewQuery.isFetchingNextPage}
                  className='mx-auto mt-2 px-5'
                  onClick={() => reviewQuery.fetchNextPage()}
                />
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default ReviewList;
