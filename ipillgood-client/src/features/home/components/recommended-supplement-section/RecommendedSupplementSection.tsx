'use client';

import Link from 'next/link';
import SurveySummaryCard from './SurveySummaryCard';
import RecommendedSupplementCard from './RecommendedSupplementCard';
import { useMyInfo } from '@/features/my/hooks/useMyInfo';
import RecommendationFeedbackModal from './RecommendationFeedbackModal';
import { useRecommendationFeedback } from '../../hooks/useRecommendationFeedback';
import { useRecommendation } from '../../hooks/useRecommendation';
import RecommendationSurveyRetakeModal from './RecommendationSurveyRetakeModal';

const RecommendedSupplementSection = () => {
  const {
    sectionRef,
    isFeedbackModalOpen,
    setIsFeedbackModalOpen,
    isSurveyRetakeModalOpen,
    setIsSurveyRetakeModalOpen,
    handleSubmit,
    isSubmitting,
  } = useRecommendationFeedback();

  const { recommendation, isLoading, isError } = useRecommendation();

  const { data: myInfo } = useMyInfo();
  const nickname = myInfo?.nickname ?? '회원';

  if (isLoading) {
    return <div className='h-64 w-full mt-8 animate-pulse bg-neutral-200 rounded-[20px]'></div>;
  }

  if (isError) return null;

  return (
    <section className='flex flex-col gap-2 mt-8 w-full' ref={sectionRef}>
      <article className='flex justify-between items-center'>
        <h2 className='text-black typo-title-gosanja text-[18px]'>정기 추천 영양 성분</h2>
        <Link
          href='/survey'
          className='flex items-center text-neutral-800 h-8 typo-caption-6 px-3 rounded-full bg-linear-[145deg] from-white via-white/40 to-white/10 shadow-[0px_4px_4px_0px_rgba(126,131,135,0.10),inset_-2px_-3px_3px_-1px_rgba(0,0,0,0.03)] border-white border transition hover:from-white/10 hover:via-white/40 hover:to-white'
        >
          설문 다시하기
        </Link>
      </article>
      {/* 설문 기반 영양 상태 요약 */}
      <SurveySummaryCard healthSummary={recommendation?.healthSummary ?? ''} />
      <article className='mt-2'>
        <p className='text-black typo-title-gosanja text-[14px] leading-5'>
          <span className='text-primary-700 text-[18px]'>{nickname} 님</span>께 아래 영양 성분들을
          추천드릴게요!
        </p>
        <p className='text-neutral-800 typo-caption-6'>
          각 영양 성분 카드를 클릭하면 해당 영양 성분을 더 자세히 알 수 있어요.
        </p>
      </article>
      {/* 추천 영양제 */}
      <div className='flex flex-col gap-2'>
        {recommendation?.items.map((recommendationItem) => (
          <RecommendedSupplementCard
            key={recommendationItem.recommendationItemId}
            recommendationItem={recommendationItem}
          />
        ))}
      </div>
      {/* 도움이 되셨나요? 모달 */}
      {isFeedbackModalOpen && (
        <RecommendationFeedbackModal
          nickname={nickname}
          onClose={() => {
            setIsFeedbackModalOpen(false);
          }}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
      {/* 도움이 되어드리지 못해 죄송합니다. 모달 */}
      {isSurveyRetakeModalOpen && (
        <RecommendationSurveyRetakeModal
          nickname={nickname}
          onClose={() => {
            setIsSurveyRetakeModalOpen(false);
          }}
        />
      )}
    </section>
  );
};

export default RecommendedSupplementSection;
