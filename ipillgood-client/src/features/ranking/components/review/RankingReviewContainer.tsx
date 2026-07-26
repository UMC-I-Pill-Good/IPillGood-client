'use client';

import { useEffect, useState } from 'react';
import { MascotSadIcon } from '@/assets';
import { Header, NavBar } from '@/shared/layout';
import { getRankingProductDetail } from '../../api/getRankingProductDetail';
import { getRankingProductReviews } from '../../api/getRankingProductReviews';
import type { RankingProductDetailDto } from '../../types/ranking';
import type { RankingReviewItem, ReviewSort } from '../../types/rankingReview';
import SupplementDetailSummaryCard from '../detail/SupplementDetailSummaryCard';
import RankingReviewCard from './RankingReviewCard';
import ReviewSortDropdown from './ReviewSortDropdown';

interface RankingReviewContainerProps {
  productId: number;
}

const RankingReviewContainer = ({ productId }: RankingReviewContainerProps) => {
  const [sort, setSort] = useState<ReviewSort>('LATEST');
  const [reviews, setReviews] = useState<RankingReviewItem[]>([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [product, setProduct] = useState<RankingProductDetailDto | null>(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let active = true;

    Promise.all([
      getRankingProductDetail(productId),
      getRankingProductReviews({ productId, sort, size: 20 }),
    ])
      .then(([productResponse, reviewResponse]) => {
        if (!active) return;
        setProduct(productResponse.result);
        setReviews(reviewResponse.result?.reviews ?? []);
        setReviewCount(reviewResponse.result?.reviewCount ?? 0);
        setLoadError(
          productResponse.isSuccess && reviewResponse.isSuccess
            ? ''
            : '후기 정보를 불러올 수 없습니다.',
        );
      })
      .catch(() => {
        if (active) setLoadError('후기 정보를 불러올 수 없습니다.');
      });

    return () => {
      active = false;
    };
  }, [productId, sort]);

  return (
    <main className='min-h-dvh bg-background pb-20' data-product-id={productId}>
      <Header title='후기 보기' />
      {product && (
        <section className='px-5 pb-2 pt-4'>
          <SupplementDetailSummaryCard product={product} showReviewButton={false} />
        </section>
      )}
      <section className='flex flex-col gap-2 px-5 py-4'>
        <div className='flex items-center justify-between'>
          <h2 className='typo-body-5 text-black'>
            전체 후기 <span className='typo-caption-6 text-neutral-800'>{reviewCount}개</span>
          </h2>
          <ReviewSortDropdown sort={sort} onChange={setSort} />
        </div>
        {loadError && (
          <p role='alert' className='py-3 text-center typo-caption-6 text-semantic-600'>
            {loadError}
          </p>
        )}
        {reviews.length === 0 ? (
          <div className='flex min-h-130 flex-col items-center justify-center gap-6 pb-12'>
            <MascotSadIcon aria-hidden='true' className='h-70 w-55' />
            <p className='typo-body-6 text-primary-600'>아직 후기가 존재하지 않아요...</p>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            {reviews.map((review) => (
              <RankingReviewCard
                key={review.reviewId}
                review={review}
                productId={productId}
                onDelete={(reviewId) => {
                  setReviews((current) => current.filter((item) => item.reviewId !== reviewId));
                  setReviewCount((current) => Math.max(0, current - 1));
                }}
              />
            ))}
          </div>
        )}
      </section>
      <NavBar />
    </main>
  );
};

export default RankingReviewContainer;
