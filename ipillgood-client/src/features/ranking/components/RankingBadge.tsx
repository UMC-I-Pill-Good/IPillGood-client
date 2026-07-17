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
      className='flex h-5 w-6 shrink-0 items-center justify-start'
      aria-label={`${rank}위`}
    >
      {isTopRank ? (
        <div className={cn('flex h-5 items-center gap-0.5', rankColor)}>
          <span className='flex h-5 w-5 shrink-0 items-center justify-center overflow-visible'>
            <BadgeIcon
              aria-hidden='true'
              className='block h-5 w-5 shrink-0 overflow-visible [&_path]:fill-current [&_path]:stroke-current'
            />
          </span>

          <span className='flex h-6 min-w-[11px] items-center justify-center text-[20px] font-medium leading-none'>
            {rank}
          </span>
        </div>
      ) : (
        <span className='flex h-6 w-full items-center justify-center text-[20px] font-medium leading-none text-neutral-800'>
          {rank}
        </span>
      )}
    </div>
  );
};

export default RankingBadge;
