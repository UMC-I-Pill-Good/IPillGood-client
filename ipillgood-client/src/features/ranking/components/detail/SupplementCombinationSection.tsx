import { DetailThumbUpIcon, DetailWarningIcon } from '@/assets';
import { Chip } from '@/shared/components';
import { cn } from '@/shared/utils/cn';
import type { RankingProductCompatibilityDto } from '../../types/ranking';

interface SupplementCombinationSectionProps {
  compatibility: RankingProductCompatibilityDto;
}

interface CombinationCardProps {
  title: string;
  ingredientNameList: string[];
  tone: 'favorable' | 'caution';
}

const CombinationCard = ({ title, ingredientNameList, tone }: CombinationCardProps) => {
  const isFavorable = tone === 'favorable';

  return (
    <article
      className={cn(
        'flex min-h-19 w-full flex-col justify-center gap-1 rounded-[20px] px-2 pb-2.25 pt-3 shadow-[0_4px_4px_rgba(126,131,135,0.1)] backdrop-blur-sm',
        isFavorable
          ? 'border border-white/40 bg-primary-300/50'
          : 'border border-white/40 bg-semantic-200/50',
      )}
    >
      <div className='flex min-w-0 items-center gap-1.75 px-1'>
        <span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-neutral-100'>
          {isFavorable ? (
            <DetailThumbUpIcon aria-hidden='true' className='size-4' />
          ) : (
            <DetailWarningIcon aria-hidden='true' className='size-4' />
          )}
        </span>
        <h3 className='min-w-0 typo-body-10 text-black'>{title}</h3>
      </div>

      <div className='flex max-w-full items-center gap-2 overflow-x-auto px-1 hide-scrollbar'>
        {ingredientNameList.map((ingredientName, index) => (
          <Chip key={`${ingredientName}-${index}`} text={ingredientName} variant='point' />
        ))}
      </div>
    </article>
  );
};

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
