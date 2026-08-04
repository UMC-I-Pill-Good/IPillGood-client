'use client';

import ConditionSummaryCard from './ConditionSummaryCard';
import { useConditionContext } from '../ConditionProvider';

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
  const { homeSummaryData, currentWeekStatus, isMonthlyRecordsLoading } =
    useConditionContext();

  const formatScore = (val: number | null | undefined): number => {
    if (val === undefined || val === null) return 0;
    return Number(Number(val).toFixed(1));
  };

  const averageVitality = propVitality ?? formatScore(homeSummaryData.averageVitalityScore);
  const averageSleepHours = propSleep ?? formatScore(homeSummaryData.averageSleepHours);
  const intakeDays = propIntakeDays ?? formatScore(homeSummaryData.averageIntakeDaysCount);
  const totalDays = propTotalDays ?? 7;
  const serverYearMonth = currentWeekStatus.today ? currentWeekStatus.today.slice(0, 7) : '';
  const displayedYearMonth = `${homeSummaryData.year}-${String(homeSummaryData.month).padStart(2, '0')}`;
  const summaryTitle =
    serverYearMonth === displayedYearMonth
      ? '이번 달 컨디션 요약'
      : `${homeSummaryData.month}월 컨디션 요약`;

  if (isMonthlyRecordsLoading) {
    return (
      <section
        className='flex w-full flex-col gap-2 px-5 pb-0 pt-4'
        aria-label='컨디션 요약을 불러오는 중'
        aria-busy='true'
      >
        <div className='h-[21px] w-28 rounded-full bg-neutral-200 motion-safe:animate-pulse motion-safe:[animation-duration:1s]' />
        <div className='grid h-[105px] w-full grid-cols-3 gap-2' aria-hidden='true'>
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={`condition-summary-skeleton-${index}`}
              className='h-[105px] w-full rounded-xl bg-white/70 motion-safe:animate-pulse motion-safe:[animation-duration:1s]'
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className='flex w-full flex-col gap-2 px-5 pt-4 pb-0'>
      <div className='flex h-[21px] w-full items-center gap-1'>
        <h2 className='typo-body-5 whitespace-nowrap text-[#111111]'>{summaryTitle}</h2>
      </div>

      <div className='grid h-[105px] w-full grid-cols-3 gap-2'>
        <ConditionSummaryCard type='vitality' label='평균 활력' value={averageVitality} total={5} />

        <ConditionSummaryCard type='sleep' label='평균 수면' value={averageSleepHours} />

        <ConditionSummaryCard
          type='intake'
          label={'주차별 평균\n섭취 기록'}
          value={intakeDays}
          total={totalDays}
        />
      </div>
    </section>
  );
};

export default ConditionSummarySection;
