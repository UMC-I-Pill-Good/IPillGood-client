import {
  ConditionStatusBanner,
  ConditionGraphSection,
  ConditionSummarySection,
  ConditionHealthStatusSection,
  ConditionCheckModals,
} from '@/features/condition/components';

const ConditionCheckPage = () => {
  return (
    /* 하단 NavBar의 세로 높이 h-16에 맞추어 pb-16 패딩 적용 */
    <main className='min-h-dvh bg-background pb-16'>
      <ConditionStatusBanner />
      <ConditionGraphSection />
      <ConditionSummarySection />
      <ConditionHealthStatusSection />

      <ConditionCheckModals />
    </main>
  );
};

export default ConditionCheckPage;