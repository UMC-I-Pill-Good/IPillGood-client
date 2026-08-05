import Link from 'next/link';
import { RecommendationItemType } from '../../types/recommendations.type';
import Image from 'next/image';
import { Chip } from '@/shared/components';

interface RecommendedSupplementCardProps {
  recommendationItem: RecommendationItemType;
}

const RecommendedSupplementCard = ({ recommendationItem }: RecommendedSupplementCardProps) => {
  const {
    ingredientId,
    ingredientName,
    imageUrl,
    effectKeywords,
    recommendedIntake,
    recommendedIntakeTime,
  } = recommendationItem;

  return (
    <Link
      href={`/ingredient/${ingredientId}`}
      className='flex items-center gap-3 rounded-[20px] p-4 w-full bg-linear-[175deg] from-[#4680FE]/10 from-70% to-[#4680FE]/16 backdrop-blur-md  shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-2px_5px_rgba(126,131,135,0.07),0_2px_3px_rgba(126,131,135,0.1)]'
    >
      <Image width={45} height={72} src={imageUrl} alt={ingredientName} />
      <div className='flex flex-col flex-1'>
        <p className='text-black typo-caption-1'>{ingredientName}</p>
        <div className='flex justify-between typo-caption-6 '>
          <span className='text-neutral-800'>일일 권장량: {recommendedIntake}</span>
          <span className='text-primary-600'>{recommendedIntakeTime}</span>
        </div>
        {/* TODO: 태그 개수 미정/ 태그 많을 경우 처리 필요  */}
        <div className='flex gap-1 mt-2 flex-wrap'>
          {effectKeywords.map((keyword) => (
            <Chip key={keyword} text={keyword} variant='point' className='bg-[#77E5B7] px-4 py-1' />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default RecommendedSupplementCard;
