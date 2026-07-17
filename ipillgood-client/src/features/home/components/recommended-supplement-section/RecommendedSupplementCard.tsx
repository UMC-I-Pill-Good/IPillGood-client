import Link from 'next/link';
import { RecommendedSupplementItemType } from '../../types/recommendedSupplement.type';
import Image from 'next/image';
import { Chip } from '@/shared/components';

interface RecommendedSupplementCardProps {
  recommendation: RecommendedSupplementItemType;
}

const RecommendedSupplementCard = ({ recommendation }: RecommendedSupplementCardProps) => {
  return (
    // TODO: 영양제 성분 상세 페이지로 이동
    <Link
      href='/home'
      className='flex items-center gap-3 bg-[#4680FE]/15 rounded-[20px] p-4 w-full '
    >
      <Image
        width={45}
        height={72}
        src={recommendation.imageUrl}
        alt={recommendation.ingredientName}
      />
      <div className='flex flex-col flex-1'>
        <p className='text-[#111] typo-caption-1'>{recommendation.ingredientName}</p>
        <div className='flex justify-between typo-caption-6 '>
          <span className='text-neutral-800'>
            일일 권장량: {recommendation.recommendedDosageText}
          </span>
          <span className='text-primary-500'>{recommendation.recommendedTimeText}</span>
        </div>
        {/* TODO: 태그 개수 미정/ 태그 많을 경우 처리 필요  */}
        <div className='flex gap-1 mt-2 flex-wrap'>
          {recommendation.tags.map((tag) => (
            <Chip key={tag} text={tag} variant='point' className='bg-[#77E5B7] px-4 py-1' />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default RecommendedSupplementCard;
