import { BadgeIcon } from '@/assets';
import { cn } from '@/shared/utils/cn';

interface RankingBadgeProps {
  rank: number;
}

const rankColorClassName: Record<number, string> = {
  1: 'text-primary-600',
  2: 'text-[#92E4C2]',
  3: 'text-secondary-600',
};

const RankingBadge = ({ rank }: RankingBadgeProps) => {
  const isTopRank = rank >= 1 && rank <= 3;
  const rankColor = isTopRank
    ? rankColorClassName[rank]
    : 'text-neutral-800';

  return (
    <div
      className='flex h-6 w-[1.3125rem] shrink-0 items-center justify-center overflow-visible'
      aria-label={`${rank}위`}
    >
      {isTopRank ? (
        <div
          className={cn(
            'flex items-center justify-center overflow-visible',
            rankColor,
          )}
        >
          <span className='relative mr-[-0.1875rem] size-[1.1875rem] shrink-0 overflow-visible'>
            <BadgeIcon
              aria-hidden='true'
              className='absolute left-[29.17%] top-[8.33%] block h-[0.9895625rem] w-[0.4948125rem] overflow-visible'
            />
          </span>
          <span className='shrink-0 typo-body-2 leading-normal'>
            {rank}
          </span>
        </div>
      ) : (
        <span className='flex size-full items-center justify-center typo-body-2 leading-normal text-neutral-800'>
          {rank}
        </span>
      )}
    </div>
  );
};

export default RankingBadge;
