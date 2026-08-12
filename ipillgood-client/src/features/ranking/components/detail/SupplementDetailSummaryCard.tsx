import { RatingStarIcon } from '@/assets';
import { Chip, TextButton } from '@/shared/components';
import type { RankingProductDetailDto } from '../../types/ranking';
import SupplementProductImage from './SupplementProductImage';

interface SupplementDetailSummaryCardProps {
  product: RankingProductDetailDto;
  showReviewButton: boolean;
}

const SupplementDetailSummaryCard = ({
  product,
  showReviewButton,
}: SupplementDetailSummaryCardProps) => {
  const ratingAverage = product.ratingAverage ?? 0;

  return (
    <article className='flex w-full items-center justify-center gap-3 rounded-[20px] border-none bg-primary-600/15 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_5px_rgba(126,131,135,0.07),0_2px_3px_rgba(126,131,135,0.1)] backdrop-blur-xl backdrop-saturate-150'>
      <SupplementProductImage
        imageKey={product.imageUrl}
        alt={`${product.productName} 상품 이미지`}
      />

      <div className='flex min-w-0 flex-1 flex-col items-end gap-1'>
        <div className='flex w-full min-w-0 flex-col items-start gap-1'>
          {product.mfdsCertified && (
            <Chip text='식약처 인증' variant='point' icon className='shadow-none text-point-100' />
          )}

          <div className='flex w-full min-w-0 flex-col gap-1'>
            <p className='truncate typo-caption-6 text-black'>{product.brand}</p>
            <h1 className='typo-body-9 text-black'>{product.productName}</h1>
            <div className='flex items-center gap-1.5 typo-caption-6 text-neutral-800'>
              <RatingStarIcon aria-hidden='true' className='size-2.5 shrink-0' />
              <span>
                {ratingAverage.toFixed(1)} ({product.reviewCount.toLocaleString('ko-KR')})
              </span>
            </div>
          </div>
        </div>

        {showReviewButton && (
          <TextButton
            href={`/reviews?productId=${product.productId}`}
            text='후기 보기'
            variant='primary'
            size='sm'
            className='px-3'
          />
        )}
      </div>
    </article>
  );
};

export default SupplementDetailSummaryCard;
