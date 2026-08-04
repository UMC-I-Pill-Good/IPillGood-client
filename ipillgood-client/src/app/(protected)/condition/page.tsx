import {
  ConditionStatusBanner,
  ConditionGraphSection,
  ConditionSummarySection,
  ConditionHealthStatusSection,
  ConditionCheckModals,
  ConditionProvider,
} from '@/features/condition/components';

const ConditionCheckPage = () => {
  return (
    <ConditionProvider>
      <main className='min-h-dvh bg-background pb-24'>
        <ConditionStatusBanner />
        <ConditionGraphSection />
        <ConditionSummarySection />
        <ConditionHealthStatusSection />

        <ConditionCheckModals />
      </main>
    </ConditionProvider>
  );
};

export default ConditionCheckPage;
