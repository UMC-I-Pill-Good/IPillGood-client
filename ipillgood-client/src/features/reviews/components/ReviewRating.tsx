import { EmptyRatingStarIcon, FilledRatingStarIcon } from '@/assets';
import { cn } from '@/shared/utils';

interface ReviewRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  iconClassName?: string;
}

const ReviewRating = ({ rating, onChange, iconClassName }: ReviewRatingProps) => (
  <div className='flex items-center gap-1'>
    {Array.from({ length: 5 }, (_, index) => {
      const star =
        index < rating ? (
          <FilledRatingStarIcon
            aria-hidden='true'
            className={cn('size-5 text-secondary-600', iconClassName)}
          />
        ) : (
          <EmptyRatingStarIcon
            aria-hidden='true'
            className={cn('size-5 text-neutral-800', iconClassName)}
          />
        );

      return onChange ? (
        <button
          key={index}
          type='button'
          aria-label={`${index + 1}점`}
          className='flex size-7.5 items-center justify-center rounded-md transition-colors hover:bg-neutral-300'
          onClick={() => onChange(index + 1)}
        >
          {star}
        </button>
      ) : (
        <span key={index}>{star}</span>
      );
    })}
  </div>
);

export default ReviewRating;
