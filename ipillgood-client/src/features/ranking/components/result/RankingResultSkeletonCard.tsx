const RankingResultSkeletonCard = () => {
  return (
    <article
      className='flex h-28 w-full items-center gap-4 rounded-2xl bg-white/60 px-4 motion-safe:animate-pulse motion-safe:[animation-duration:1s]'
      aria-hidden='true'
    >
      <div className='h-20 w-12 shrink-0 rounded-lg bg-neutral-200' />

      <div className='flex min-w-0 flex-1 flex-col gap-3'>
        <div className='h-3.5 w-full max-w-72 rounded-full bg-neutral-200' />
        <div className='h-3.5 w-full max-w-52 rounded-full bg-neutral-200' />
        <div className='mt-4 h-3.5 w-24 rounded-full bg-neutral-200' />
      </div>
    </article>
  );
};

export default RankingResultSkeletonCard;
