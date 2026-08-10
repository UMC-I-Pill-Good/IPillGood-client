import { HomeMascotIcon } from '@/assets';

interface SurveySummaryCardProps {
  healthSummary: string;
}
const SurveySummaryCard = ({ healthSummary }: SurveySummaryCardProps) => {
  return (
    <div className='min-h-40.5 relative flex flex-col gap-1 py-2 px-4 rounded-[20px] home-card-glass'>
      <p className='text-black typo-caption-2'>설문 기반 건강 상태 요약</p>
      <div className='w-[75%] text-neutral-800 typo-caption-7 leading-4.5!'>{healthSummary}</div>
      <HomeMascotIcon className='absolute -top-0.5 -right-6' />
    </div>
  );
};

export default SurveySummaryCard;
