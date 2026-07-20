import {
  ConditionStatusBanner,
  ConditionGraphSection,
  ConditionSummarySection,
  ConditionHealthStatusSection,
  ConditionCheckModals,
} from '@/features/condition/components';

const ConditionCheckPage = () => {
  return (
    <main className='min-h-dvh bg-background'>
      <ConditionStatusBanner />
      <ConditionGraphSection />
      <ConditionSummarySection />
      <ConditionHealthStatusSection />

      <ConditionCheckModals />
    </main>
  );
};

export default ConditionCheckPage;