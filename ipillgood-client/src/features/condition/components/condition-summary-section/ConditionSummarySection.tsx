'use client';

import ConditionSummaryCard from './ConditionSummaryCard';
import { useConditionFlow } from '../../hooks/useConditionFlow';

interface ConditionSummarySectionProps {
  dateRange?: string;
  averageVitality?: number;
  averageSleepHours?: number;
  intakeDays?: number;
  totalDays?: number;
}

const ConditionSummarySection = ({
  dateRange = '5/1~5/7',
  averageVitality: propVitality,
  averageSleepHours: propSleep,
  intakeDays: propIntakeDays,
  totalDays: propTotalDays,
}: ConditionSummarySectionProps = {}) => {
  const { homeSummaryData } = useConditionFlow();
  const { monthlySummary } = homeSummaryData;

  const averageVitality = propVitality ?? monthlySummary.avgVitalityScore ?? 3;
  const averageSleepHours = propSleep ?? monthlySummary.avgSleepHours ?? 4.5;
  const intakeDays = propIntakeDays ?? monthlySummary.intakeDays;
  const totalDays = propTotalDays ?? monthlySummary.intakeTotalDays;

  return (
    <section className='flex w-full flex-col gap-2 px-5 pt-4 pb-0'>
      <div className='flex h-[21px] w-full items-center gap-1'>
        <h2 className='typo-body-5 whitespace-nowrap text-[#111111]'>
          이번 달 컨디션 요약
        </h2>

        <p className='typo-caption-7 whitespace-nowrap text-[#757575]'>
          ({dateRange})
        </p>
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