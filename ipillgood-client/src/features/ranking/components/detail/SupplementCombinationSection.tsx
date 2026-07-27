import type { RankingProductCompatibilityDto } from '../../types/ranking';
import CombinationCard from './CombinationCard';

interface SupplementCombinationSectionProps {
  compatibility: RankingProductCompatibilityDto;
}

const SupplementCombinationSection = ({ compatibility }: SupplementCombinationSectionProps) => (
  <section className='flex w-full flex-col gap-2.5 px-5 pb-2.25 pt-3'>
    <div className='flex flex-col gap-1'>
      <h2 className='typo-body-5 text-black'>내 영양제와 궁합</h2>
      <p className='typo-caption-6 text-neutral-800'>
        보유 중인 영양제 {compatibility.ownedProductCount}개 기준
      </p>
    </div>

    <CombinationCard
      title='함께 섭취하면 좋은 조합이에요!'
      ingredientNameList={compatibility.goodCombinations.map((item) => item.targetIngredientName)}
      tone='favorable'
    />
    <CombinationCard
      title='주의가 필요한 조합이에요!'
      ingredientNameList={compatibility.cautionCombinations.map(
        (item) => item.targetIngredientName,
      )}
      tone='caution'
    />
  </section>
);

export default SupplementCombinationSection;
