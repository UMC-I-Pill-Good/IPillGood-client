import { TextButton } from '@/shared/components';
import type {
  ProductIngredient,
  RankingProductCompatibilityDto,
  RankingProductDetailDto,
} from '../../types/ranking';
import SupplementAdvertisingNotice from './SupplementAdvertisingNotice';
import SupplementCombinationSection from './SupplementCombinationSection';
import SupplementDetailSummaryCard from './SupplementDetailSummaryCard';
import SupplementIngredientBottomSheet from './SupplementIngredientBottomSheet';

interface RankingProductDetailProps {
  product: RankingProductDetailDto;
  ingredients: ProductIngredient[];
  compatibility: RankingProductCompatibilityDto;
}

const RankingProductDetail = ({
  product,
  ingredients,
  compatibility,
}: RankingProductDetailProps) => (
  <>
    <section className='px-5 pb-2 pt-4'>
      <SupplementDetailSummaryCard product={product} showReviewButton />
    </section>
    <section className='flex w-full flex-col gap-2 px-5 py-2'>
      <div className='flex items-center justify-between gap-3'>
        <h2 className='typo-body-5 text-black'>영양제 설명</h2>
        <SupplementIngredientBottomSheet ingredients={ingredients} />
      </div>
      <div className='min-h-26.75 rounded-[20px] border border-white/70 bg-white/50 px-3 py-2 shadow-[0_4px_4px_rgba(126,131,135,0.1)] backdrop-blur-sm'>
        <p className='line-clamp-4 typo-body-11 text-neutral-800'>{product.description}</p>
      </div>
    </section>
    {product.adClaimRisk && product.adClaimRiskIngredients.length > 0 && (
      <SupplementAdvertisingNotice ingredientName={product.adClaimRiskIngredients.join(', ')} />
    )}
    <SupplementCombinationSection compatibility={compatibility} />
    <section className='flex w-full flex-col gap-2 px-5 py-4'>
      <p className='text-center typo-caption-6 text-neutral-800'>
        질병 치료 및 의약품을 복용 중이라면 의사 상담 후 섭취를 추천드려요.
      </p>
      <TextButton
        href={product.purchaseUrl}
        target='_blank'
        rel='noopener noreferrer'
        text='구매하러 가기'
        size='xl'
        className='h-13 w-full rounded-lg px-2 typo-body-2'
      />
    </section>
  </>
);

export default RankingProductDetail;
