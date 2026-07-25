'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EmptyRatingStarIcon, FilledRatingStarIcon } from '@/assets';
import { TextButton } from '@/shared/components';
import { NavBar } from '@/shared/layout';
import RankingPageHeader from '../RankingPageHeader';
import { getRankingProductReviews } from '../../api/getRankingProductReviews';
import { getRankingProductDetail } from '../../api/getRankingProductDetail';
import type { RankingReviewItem } from '../../types/rankingReview';
import type { RankingProductDetailDto } from '../../types/ranking';
import SupplementDetailSummaryCard from '../detail/SupplementDetailSummaryCard';

interface RankingReviewEditContainerProps {
  productId: number;
  reviewId: number;
}


const RankingReviewEditContainer = ({ productId, reviewId }: RankingReviewEditContainerProps) => {
  const router = useRouter();
  const [review, setReview] = useState<RankingReviewItem | null>(null);
  const [product, setProduct] = useState<RankingProductDetailDto | null>(null);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([
      getRankingProductReviews({ productId, size: 20 }),
      getRankingProductDetail(productId),
    ]).then(([reviewResponse, productResponse]) => {
      if (!active) return;
      const foundReview = reviewResponse.result?.reviews.find((item) => item.reviewId === reviewId) ?? null;
      setReview(foundReview);
      setContent(foundReview?.content ?? '');
      setRating(foundReview?.rating ?? 0);
      setProduct(productResponse.result);
      setIsLoading(false);
    });
    return () => {
      active = false;
    };
  }, [productId, reviewId]);

  const handleSubmit = () => {
    if (!review || !content.trim() || rating === 0 || isSubmitting) return;
    setIsSubmitting(true);
    // TODO: 후기 수정 API 연결 시 PATCH /reviews/{reviewId} 요청으로 교체
    setTimeout(() => {
      setIsSubmitting(false);
      router.back();
    }, 300);
  };

  if (isLoading) {
    return <main className='min-h-dvh bg-background'><RankingPageHeader title='후기 작성하기' /><p className='p-5 typo-body-10 text-neutral-800'>후기 정보를 불러오는 중입니다.</p></main>;
  }

  if (!review || !review.mine) {
    return <main className='min-h-dvh bg-background'><RankingPageHeader title='후기 작성하기' /><p className='p-5 typo-body-10 text-neutral-800'>수정할 후기를 찾을 수 없습니다.</p></main>;
  }

  return (
    <main className='min-h-dvh bg-background pb-24'>
      <RankingPageHeader title='후기 작성하기' />
      {product && (
        <section className='px-5 pb-2 pt-4'>
          <SupplementDetailSummaryCard product={product} />
        </section>
      )}
      <section className='flex flex-col gap-5 px-5 py-5'>
        <div className='flex flex-col gap-1'>
          <h2 className='typo-body-1 text-black'>만족도</h2>
          <div className='flex items-center gap-2.5'>
          {Array.from({ length: 5 }, (_, index) => (
            <button key={index} type='button' aria-label={`${index + 1}점`} onClick={() => setRating(index + 1)}>
              {index < rating ? (
                <FilledRatingStarIcon className='h-[23.75px] w-[25px] text-secondary-600' aria-hidden='true' />
              ) : (
                <EmptyRatingStarIcon className='h-[23.75px] w-[25px] text-neutral-400' aria-hidden='true' />
              )}
            </button>
            ))}
          </div>
          <p className='typo-caption-7 text-neutral-800'>별점을 선택해 주세요</p>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='review-content' className='typo-body-9 text-black'>후기 내용</label>
          <textarea
            id='review-content'
            value={content}
            maxLength={300}
            onChange={(event) => setContent(event.target.value)}
            className='min-h-[280px] resize-none rounded-[20px] border border-white bg-white/60 px-3 py-2 typo-body-10 text-black shadow-[0_4px_4px_rgba(126,131,135,0.1)] outline-none'
          />
          <p className='text-right typo-caption-7 text-neutral-800'>{content.length}/300</p>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-1'>
            <h2 className='typo-body-9 text-black'>사진 첨부하기</h2>
            <span className='typo-caption-7 text-neutral-800'>(선택)</span>
          </div>
          <div className='flex gap-2'>
            {review.imageKeys.length < 3 && (
              <label className='flex size-32 cursor-pointer items-center justify-center rounded-lg border border-neutral-400 text-5xl font-light text-neutral-500'>
                +
                <input type='file' accept='image/*' className='sr-only' />
              </label>
            )}
            {review.imageKeys.map((imageKey) => (
              <div key={imageKey} className='flex size-32 items-center justify-center overflow-hidden rounded-lg bg-neutral-300 typo-body-2 text-neutral-800'>
                {imageKey.startsWith('http') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageKey} alt='기존 후기 이미지' className='size-full object-cover' />
                ) : '사진'}
              </div>
            ))}
          </div>
          <p className='typo-caption-7 text-neutral-800'>최대 3개 첨부 가능</p>
        </div>
        <TextButton type='button' text={isSubmitting ? '수정 중...' : '수정 완료'} size='xl' className='mt-2 h-13 w-full' disabled={isSubmitting || !content.trim() || rating === 0} onClick={handleSubmit} />
      </section>
      <NavBar />
    </main>
  );
};

export default RankingReviewEditContainer;
