import ConditionGraphSection from '@/features/condition/components/ConditionGraphSection';
import ConditionHealthStatusSection from '@/features/condition/components/ConditionHealthStatusSection';
import ConditionStatusBanner from '@/features/condition/components/ConditionStatusBanner';
import ConditionSummarySection from '@/features/condition/components/ConditionSummarySection';

const ConditionCheckPage = () => {
  return (
    <main className='min-h-dvh bg-background'>
      <ConditionStatusBanner />
      <ConditionGraphSection />
      <ConditionSummarySection />

      <ConditionHealthStatusSection href='/condition/health-status' />
    </main>
  );
};

export default ConditionCheckPage;