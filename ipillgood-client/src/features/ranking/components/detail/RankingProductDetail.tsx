import type {
  ProductIngredient,
  RankingProductCompatibilityDto,
  RankingProductDetailDto,
} from '../../types/ranking';
import SupplementAdvertisingNotice from './SupplementAdvertisingNotice';
import SupplementCombinationSection from './SupplementCombinationSection';
import SupplementDetailSummaryCard from './SupplementDetailSummaryCard';
import SupplementIngredientBottomSheet from './SupplementIngredientBottomSheet';
import ProductPurchaseSection from './ProductPurchaseSection';
import ProductCabinetAddSection from './ProductCabinetAddSection';

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
    <SupplementAdvertisingNotice
      ingredientName={
        product.adClaimRisk && product.adClaimRiskIngredients.length > 0
          ? product.adClaimRiskIngredients.join(', ')
          : undefined
      }
    />
    <SupplementCombinationSection compatibility={compatibility} />
    <ProductPurchaseSection productId={product.productId} />
    {product.isOwned === false && <ProductCabinetAddSection productId={product.productId} />}
  </>
);

export default RankingProductDetail;
