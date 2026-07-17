import { BadgeIcon } from '@/assets';
import { cn } from '@/shared/utils/cn';

interface RankingBadgeProps {
  rank: number;
}

const rankColorClassName: Record<number, string> = {
  1: 'text-primary-600',
  2: 'text-point-900',
  3: 'text-secondary-800',
};

const RankingBadge = ({ rank }: RankingBadgeProps) => {
  const isTopRank = rank >= 1 && rank <= 3;
  const rankColor = isTopRank
    ? rankColorClassName[rank]
    : 'text-neutral-800';

  return (
    <div
      className='flex h-6 w-6 shrink-0 items-center justify-center'
      aria-label={`${rank}위`}
    >
      {isTopRank ? (
        <div className={cn('flex h-6 items-center justify-center', rankColor)}>
          <span className='-mr-2 flex shrink-0 items-center justify-center overflow-visible'>
            <BadgeIcon
              aria-hidden='true'
              className='ranking-badge-mark block shrink-0 overflow-visible'
            />
          </span>

          <span className='flex h-6 min-w-3 items-center justify-center text-xl font-medium leading-none'>
            {rank}
          </span>
        </div>
      ) : (
        <span className='flex h-6 w-full items-center justify-center text-xl font-medium leading-none text-neutral-800'>
          {rank}
        </span>
      )}
    </div>
  );
};

export default RankingBadge;
