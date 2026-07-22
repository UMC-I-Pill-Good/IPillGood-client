import { MascotSadIcon } from '@/assets';

interface RankingResultEmptyStateProps {
  message?: string;
}

const RankingResultEmptyState = ({
  message = '검색 결과가 존재하지 않아요...',
}: RankingResultEmptyStateProps) => {
  return (
    <section className='flex w-full flex-col items-center pt-[6.25rem] text-center'>
      <MascotSadIcon aria-hidden='true' className='block h-76 w-64' />
      <p className='mt-5 typo-body-6 text-center leading-normal text-primary-700'>
        {message}
      </p>
    </section>
  );
};

export default RankingResultEmptyState;
