import { TextButton } from '@/shared/components';
import { Header } from '@/shared/layout';
import { getRankingProductCompatibility } from '@/features/ranking/api/getRankingProductCompatibility';
import { getRankingProductDetail } from '@/features/ranking/api/getRankingProductDetail';
import SupplementAdvertisingNotice from '@/features/ranking/components/detail/SupplementAdvertisingNotice';
import SupplementCombinationSection from '@/features/ranking/components/detail/SupplementCombinationSection';
import SupplementDetailSummaryCard from '@/features/ranking/components/detail/SupplementDetailSummaryCard';
import SupplementIngredientBottomSheet from '@/features/ranking/components/detail/SupplementIngredientBottomSheet';
import type { RankingProductCompatibilityDto } from '@/features/ranking/types/ranking';

type RankingProductDetailPageProps = {
  params: Promise<{ productId: string }>;
};

const RankingProductDetailPage = async ({ params }: RankingProductDetailPageProps) => {
  const { productId } = await params;
  const resolvedProductId = Number(productId);
  const [response, compatibilityResponse] = await Promise.all([
    getRankingProductDetail(resolvedProductId),
    getRankingProductCompatibility(resolvedProductId),
  ]);
  const product = response.result;

  if (!response.isSuccess || !product) {
    return (
      <main className='min-h-dvh bg-background pb-16'>
        <Header title='영양제 더보기' />
        <p className='flex min-h-60 items-center justify-center px-5 text-center typo-body-10 text-neutral-800'>
          {response.message}
        </p>
      </main>
    );
  }

  const compatibility: RankingProductCompatibilityDto = compatibilityResponse.result ?? {
    productId: resolvedProductId,
    ownedProductCount: 0,
    goodCombinations: [],
    cautionCombinations: [],
  };

  return (
    <main className='min-h-dvh overflow-x-hidden bg-background pb-16'>
      <Header title='영양제 더보기' />
      <section className='px-5 pb-2 pt-4'>
        <SupplementDetailSummaryCard product={product} showReviewButton />
      </section>
      <section className='flex w-full flex-col gap-2 px-5 py-2'>
        <div className='flex items-center justify-between gap-3'>
          <h2 className='typo-body-5 text-black'>영양제 설명</h2>
          <SupplementIngredientBottomSheet ingredients={product.ingredients} />
        </div>
        <div className='min-h-26.75 rounded-[20px] border border-white/70 bg-white/50 px-3 py-2 shadow-[0_4px_4px_rgba(126,131,135,0.1)] backdrop-blur-sm'>
          <p className='line-clamp-4 typo-body-11 text-neutral-800'>{product.description}</p>
        </div>
      </section>
      <SupplementAdvertisingNotice
        ingredientName={product.adClaimRiskIngredients[0]?.name ?? '확인 필요 성분'}
      />
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
    </main>
  );
};

export default RankingProductDetailPage;
