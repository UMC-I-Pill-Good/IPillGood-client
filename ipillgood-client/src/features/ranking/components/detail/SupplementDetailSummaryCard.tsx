import { RatingStarIcon } from '@/assets';
import { Chip, TextButton } from '@/shared/components';
import Link from 'next/link';
import type { RankingProductDetailDto } from '../../types/ranking';
import SupplementDetailProductImage from './SupplementDetailProductImage';

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
    <article className='flex min-h-[102px] w-full items-center justify-center gap-3 rounded-[20px] bg-primary-600/15 px-5 py-4 shadow-[0_4px_4px_rgba(126,131,135,0.1)]'>
      <SupplementDetailProductImage
        imageKey={product.imageUrl}
        productName={product.productName}
      />

      <div className='flex min-w-0 flex-1 flex-col items-end gap-1'>
        <div className='flex w-full min-w-0 flex-col items-start gap-1'>
          {product.mfdsCertified && (
            <Chip
              text='식약처 인증'
              variant='point'
              icon
              className='!h-6 !gap-1 !px-2 !shadow-none text-[12px] text-point-100 [&>span]:mr-0 [&>span>svg]:h-[11px] [&>span>svg]:w-[9px]'
            />
          )}

          <div className='flex w-full min-w-0 flex-col gap-1'>
            <p className='truncate typo-caption-6 text-black'>{product.brand}</p>
            <h1 className='truncate typo-body-9 text-black'>{product.productName}</h1>
            <div className='flex items-center gap-1.5 typo-caption-6 text-neutral-800'>
              <RatingStarIcon aria-hidden='true' className='size-2.5 shrink-0' />
              <span>
                {ratingAverage.toFixed(1)} ({product.reviewCount.toLocaleString('ko-KR')})
              </span>
            </div>
          </div>
        </div>

        {showReviewButton && (
          <Link href={`/product/${product.productId}/reviews`}>
            <TextButton type='button' text='후기 보기' variant='primary' size='sm' className='px-3' />
          </Link>
        )}
      </div>
    </article>
  );
};

export default SupplementDetailSummaryCard;
