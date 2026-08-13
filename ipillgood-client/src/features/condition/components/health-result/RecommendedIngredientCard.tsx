import { type KeyboardEvent } from 'react';
import Image from 'next/image';
import { type IngredientSummary } from '../../types/healthStatus';
import { Omega3BottleIcon } from '@/assets';
import { Chip } from '@/shared/components';
import { ChevronRight } from 'lucide-react';
import IngredientKeywordList from './IngredientKeywordList';
import { clsx } from 'clsx';

interface RecommendedIngredientCardProps {
  ingredient: IngredientSummary;
  onClick?: (ingredientId: number) => void;
}

const RecommendedIngredientCard = ({
  ingredient,
  onClick,
}: RecommendedIngredientCardProps) => {
  const handleCardClick = () => {
    if (onClick) {
      onClick(ingredient.ingredientId);
    }
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.repeat || (event.key !== 'Enter' && event.key !== ' ')) return;

    event.preventDefault();
    handleCardClick();
  };

  const ingredientImageUrl = ingredient.imageUrl
    ? ingredient.imageUrl.startsWith('http') || ingredient.imageUrl.startsWith('/')
      ? ingredient.imageUrl
      : `/${ingredient.imageUrl}`
    : null;

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick ? handleCardClick : undefined}
      onKeyDown={onClick ? handleCardKeyDown : undefined}
      className={clsx(
        'glass !h-auto !w-full !flex !whitespace-normal items-start gap-3 rounded-[20px] !bg-[rgba(127,153,255,0.28)] px-5 py-4 box-border transition-all',
        onClick && 'cursor-pointer hover:bg-[rgba(127,153,255,0.2)]',
      )}
    >
      <div className='flex w-[54px] shrink-0 items-center justify-center self-center overflow-visible'>
        {ingredientImageUrl ? (
          <Image
            src={ingredientImageUrl}
            alt={ingredient.name}
            width={54}
            height={80}
            className='block h-[80px] w-[54px] object-contain overflow-visible'
          />
        ) : (
          <Omega3BottleIcon className='h-[80px] w-[54px] object-contain overflow-visible' />
        )}
      </div>

      <div className='flex min-w-0 flex-1 flex-col gap-2'>
        <div className='flex min-w-0 flex-col items-start gap-1 w-full'>
          {ingredient.hasCabinetProduct && (
            <Chip
              text='캐비닛 내 존재'
              variant='point'
              className='bg-secondary-600 shadow-[0_4px_4px_rgba(126,131,135,0.1)] text-white typo-caption-2 h-6 px-3 mb-1'
            />
          )}

          <div className='flex min-w-0 flex-col items-start gap-2 w-full pl-1'>
            <div className='flex w-full min-w-0 items-center justify-between'>
              <h3 className='min-w-0 typo-body-5 text-black truncate leading-none'>
                {ingredient.name}
              </h3>
              <span className='flex size-6 shrink-0 items-center justify-center transition-all rounded-full hover:bg-neutral-100/70 active:bg-neutral-200/70'>
                <ChevronRight
                  aria-hidden='true'
                  className='size-5 text-neutral-800'
                />
              </span>
            </div>

            <div className='flex min-w-0 flex-col items-start gap-0.5 w-full'>
              <span className='w-full typo-body-10 font-semibold text-primary-700 leading-none'>
                추천 이유
              </span>
              <p className='w-full whitespace-pre-line break-keep typo-caption-3 text-black leading-tight'>
                {ingredient.description}
              </p>
            </div>
          </div>
        </div>

        <IngredientKeywordList
          ingredientId={ingredient.ingredientId}
          keywordList={ingredient.effectKeywords}
        />
      </div>
    </div>
  );
};

export default RecommendedIngredientCard;
