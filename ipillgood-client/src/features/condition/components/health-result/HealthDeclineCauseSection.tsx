interface HealthDeclineCauseSectionProps {
  declineCause: string;
}

const HealthDeclineCauseSection = ({
  declineCause,
}: HealthDeclineCauseSectionProps) => {
  return (
    <section className='flex min-h-[137px] w-full flex-col items-start gap-2.5 px-5 py-4 box-border'>
      <h2 className='min-h-6 w-full typo-body-1 text-black leading-none'>
        감퇴 원인
      </h2>
      <div className='glass !h-auto !w-full !flex !flex-col !whitespace-normal items-start gap-2.5 rounded-lg border border-white bg-white/50 px-3 py-2 box-border'>
        <p className='w-full whitespace-pre-line break-keep typo-body-10 text-neutral-800 leading-normal align-top pb-4'>
          {declineCause}
        </p>
      </div>
    </section>
  );
};

export default HealthDeclineCauseSection;
