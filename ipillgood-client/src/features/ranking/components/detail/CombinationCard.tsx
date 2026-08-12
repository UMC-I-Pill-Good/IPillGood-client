import { DetailThumbUpIcon, DetailWarningIcon } from '@/assets';
import { Chip } from '@/shared/components';
import { cn } from '@/shared/utils/cn';

interface CombinationCardProps {
  title: string;
  ingredientNameList: string[];
  emptyMessage: string;
  tone: 'favorable' | 'caution';
}

const CombinationCard = ({
  title,
  ingredientNameList,
  emptyMessage,
  tone,
}: CombinationCardProps) => {
  const isFavorable = tone === 'favorable';

  return (
    <article
      className={cn(
        'flex min-h-19 w-full flex-col justify-center gap-1 rounded-[20px] px-2 pb-2.25 pt-3 shadow-[0_4px_4px_rgba(126,131,135,0.1)] backdrop-blur-sm',
        isFavorable
          ? 'border border-white/40 bg-primary-300/50'
          : 'border border-white/40 bg-semantic-200/50',
      )}
    >
      <div className='flex min-w-0 items-center gap-1.75 px-1 py-1'>
        <span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-neutral-100'>
          {isFavorable ? (
            <DetailThumbUpIcon aria-hidden='true' className='size-4' />
          ) : (
            <DetailWarningIcon aria-hidden='true' className='size-4' />
          )}
        </span>
        <h3 className='min-w-0 typo-body-10 text-black'>{title}</h3>
      </div>

      {ingredientNameList.length > 0 ? (
        <div className='flex max-w-full items-center gap-2 overflow-x-auto px-1 hide-scrollbar'>
          {ingredientNameList.map((ingredientName, index) => (
            <Chip key={`${ingredientName}-${index}`} text={ingredientName} variant='point' />
          ))}
        </div>
      ) : (
        <p className='-translate-y-1 pl-[35px] pr-1 typo-caption-6 text-neutral-800'>
          {emptyMessage}
        </p>
      )}
    </article>
  );
};

export default CombinationCard;
