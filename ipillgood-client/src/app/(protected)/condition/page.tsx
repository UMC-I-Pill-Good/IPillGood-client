import {
  ConditionGraphSection,
  ConditionHealthStatusSection,
  ConditionStatusBanner,
  ConditionSummarySection,
} from '@/features/condition/components';

const ConditionCheckPage = () => {
  return (
    <main className='min-h-dvh bg-background'>
      <ConditionStatusBanner isCompleted={false} />
      <ConditionGraphSection />
      <ConditionSummarySection />

      <ConditionHealthStatusSection />
    </main>
  );
};

export default ConditionCheckPage;