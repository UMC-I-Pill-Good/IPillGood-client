import ConditionSummaryCard from './ConditionSummaryCard';

interface ConditionSummarySectionProps {
    dateRange?: string;
    averageVitality?: number;
    averageSleepHours?: number;
    intakeDays?: number;
    totalDays?: number;
}

const ConditionSummarySection = ({
    dateRange = '5/1~5/7',
    averageVitality = 3,
    averageSleepHours = 4.5,
    intakeDays = 3,
    totalDays = 7,
}: ConditionSummarySectionProps) => {
    return (
        <section className='flex w-full flex-col gap-2 px-5 py-4'>
            <div className='flex h-[21px] w-full items-center gap-1'>
                <h2 className='typo-body-5 h-[21px] whitespace-nowrap text-[#111111]'>
                    이번 달 컨디션 요약
                </h2>

                <p className='typo-caption-7 h-3.5 whitespace-nowrap text-neutral-800'>
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