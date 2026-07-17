import Link from 'next/link';
import { mockRecommendationResult } from '../../api/recommendedSupplement.mock';
import SurveySummaryCard from './SurveySummaryCard';
import RecommendedSupplementCard from './RecommendedSupplementCard';

const RecommendedSupplementSection = () => {
  const { healthSummary, recommendations } = mockRecommendationResult;
  return (
    <div className='flex flex-col gap-2 mt-8'>
      <div className='flex justify-between items-center'>
        <h2 className='text-[#111] typo-body-5'>정기 추천 영양 성분</h2>
        {/* TODO: 마이페이지 설문 수정으로 이동 */}
        <Link href='/home' className='text-neutral-800 typo-caption-6'>
          설문 수정하기
        </Link>
      </div>
      {/* 설문 기반 영양 상태 요약 */}
      <SurveySummaryCard healthSummary={healthSummary} />
      <div className='mt-2'>
        <p className='text-[#111] typo-caption-1'>
          {/* TODO: 이름 */}
          <span className='text-primary-600 typo-body-9'>OO님</span>께 아래 영양제들을 추천드릴게요!
        </p>
        <p className='text-neutral-800 typo-caption-6'>
          각 영양 성분 카드를 클릭하면 해당 영양 성분을 더 자세히 알 수 있어요.
        </p>
      </div>
      {/* 추천 영양제 */}
      <div className='flex flex-col gap-2'>
        {recommendations.map((recommendation) => (
          <RecommendedSupplementCard
            key={recommendation.ingredientId}
            recommendation={recommendation}
          />
        ))}
      </div>
      {/* TODO: 도움이 되셨나요? 모달 추가 */}
    </div>
  );
};

export default RecommendedSupplementSection;
