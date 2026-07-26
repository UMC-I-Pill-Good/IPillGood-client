'use client';

import ConditionSummaryCard from './ConditionSummaryCard';
import { useConditionFlow } from '../../hooks/useConditionFlow';

interface ConditionSummarySectionProps {
  averageVitality?: number;
  averageSleepHours?: number;
  intakeDays?: number;
  totalDays?: number;
}

const ConditionSummarySection = ({
  averageVitality: propVitality,
  averageSleepHours: propSleep,
  intakeDays: propIntakeDays,
  totalDays: propTotalDays,
}: ConditionSummarySectionProps = {}) => {
  const { homeSummaryData } = useConditionFlow();

  const formatScore = (val: number | null | undefined): number => {
    if (val === undefined || val === null) return 0;
    return Number(Number(val).toFixed(1));
  };

  const averageVitality = propVitality ?? formatScore(homeSummaryData.averageVitalityScore);
  const averageSleepHours = propSleep ?? formatScore(homeSummaryData.averageSleepHours);
  const intakeDays = propIntakeDays ?? formatScore(homeSummaryData.averageIntakeDaysCount);
  const totalDays = propTotalDays ?? 7;

  return (
    <section className='flex w-full flex-col gap-2 px-5 pt-4 pb-0'>
      <div className='flex h-[21px] w-full items-center gap-1'>
        <h2 className='typo-body-5 whitespace-nowrap text-[#111111]'>
          이번 달 컨디션 요약
        </h2>
      </div>

      <div className='grid h-[91px] w-full grid-cols-3 gap-2'>
        <ConditionSummaryCard
          type='vitality'
          label='평균 활력'
          value={averageVitality}
          total={5}
        />

        <ConditionSummaryCard
          type='sleep'
          label='평균 수면'
          value={averageSleepHours}
        />

        <ConditionSummaryCard
          type='intake'
          label='섭취 기록'
          value={intakeDays}
          total={totalDays}
        />
      </div>
    </section>
  );
};

export default ConditionSummarySection;