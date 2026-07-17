interface SurveySummaryCardProps {
  healthSummary: string;
}
const SurveySummaryCard = ({ healthSummary }: SurveySummaryCardProps) => {
  return (
    // TODO: 마스코트 삽입
    <div className='flex flex-col h-36.5 gap-1 py-2 px-4 border border-white bg-white/50 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(126,131,135,0.1)] '>
      <p className='text-[#111] typo-caption-2'>설문 기반 건강 상태 요약</p>
      <p className='text-neutral-800 typo-caption-7'>{healthSummary}</p>
    </div>
  );
};

export default SurveySummaryCard;
