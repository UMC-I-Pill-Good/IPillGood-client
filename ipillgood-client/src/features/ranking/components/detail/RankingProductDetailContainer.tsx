import RankingPageHeader from '../RankingPageHeader';
import { TextButton } from '@/shared/components';
import { getRankingProductDetail } from '../../api/getRankingProductDetail';
import { getRankingProductCompatibility } from '../../api/getRankingProductCompatibility';
import SupplementAdvertisingNotice from './SupplementAdvertisingNotice';
import SupplementCombinationSection from './SupplementCombinationSection';
import SupplementDetailSummaryCard from './SupplementDetailSummaryCard';
import SupplementIngredientBottomSheet from './SupplementIngredientBottomSheet';

interface RankingProductDetailContainerProps {
  productId: number;
}

const RankingProductDetailContainer = async ({ productId }: RankingProductDetailContainerProps) => {
  const [response, compatibilityResponse] = await Promise.all([
    getRankingProductDetail(productId),
    getRankingProductCompatibility(productId),
  ]);
  const product = response.result;

  if (!response.isSuccess || !product) {
    return (
      <main className='min-h-dvh bg-background pb-24'>
        <RankingPageHeader title='영양제 더보기' />
        <p className='flex min-h-60 items-center justify-center px-5 text-center typo-body-10 text-neutral-800'>
          {response.message}
        </p>
      </main>
    );
  }

  return (
    <main className='min-h-dvh overflow-x-hidden bg-background pb-24'>
      <RankingPageHeader title='영양제 더보기' />

      <section className='px-5 pb-2 pt-4'>
        <SupplementDetailSummaryCard product={product} />
      </section>

      <section className='flex w-full flex-col gap-2 px-5 py-2'>
        <div className='flex items-center justify-between gap-3'>
          <h2 className='typo-body-5 text-black'>영양제 설명</h2>
          <SupplementIngredientBottomSheet ingredients={product.ingredients} />
        </div>
        <div className='min-h-[171px] rounded-[20px] border border-white/70 bg-white/50 px-3 py-2 shadow-[0_4px_4px_rgba(126,131,135,0.1)] backdrop-blur-sm'>
          <p className='line-clamp-4 typo-body-11 text-neutral-800'>{product.description}</p>
        </div>
      </section>

      <SupplementAdvertisingNotice
        ingredientName={product.adClaimRiskIngredients[0]?.name ?? product.ingredients[0]?.name ?? ''}
      />

      {compatibilityResponse.result && (
        <SupplementCombinationSection compatibility={compatibilityResponse.result} />
      )}

      <section className='flex w-full flex-col gap-2 px-5 py-4'>
        <p className='text-center typo-caption-6 text-neutral-800'>
          질병 치료 및 의약품을 복용 중이라면 의사 상담 후 섭취를 추천드려요.
        </p>
        <TextButton
          type='button'
          text='구매하러 가기'
          size='xl'
          className='h-[52px] w-full rounded-[8px] px-2 text-[20px]'
        />
      </section>
    </main>
  );
};

export default RankingProductDetailContainer;
