import IntakeSupplementSection from '../intake-supplement-section/IntakeSupplementSection';
import TodayIntakeCheckSection from '../today-intake-check-section/TodayIntakeCheckSection';
import IntakeCalendarSection from '../intake-calendar-section/IntakeCalendarSection';
import GrowthStageSection from '../growth-stage-section/GrowthStageSection';
import RecommendedSupplementSection from '../recommended-supplement-section/RecommendedSupplementSection';

const HomeSection = () => {
  return (
    <>
      {/* 섭취 중인 영양제 */}
      <IntakeSupplementSection />

      {/* 영양제 섭취 체크 */}
      <TodayIntakeCheckSection />

      {/* 영양제 복용 캘린더 */}
      <IntakeCalendarSection />

      {/* 연속 섭취 */}
      <GrowthStageSection />

      {/* 정기 추천 영양 성분 */}
      <RecommendedSupplementSection />
    </>
  );
};

export default HomeSection;
