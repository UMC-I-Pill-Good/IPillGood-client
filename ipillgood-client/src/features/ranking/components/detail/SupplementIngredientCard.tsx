import SupplementProductImage from './SupplementProductImage';
import type { ProductIngredient } from '../../types/ranking';
import { Chip } from '@/shared/components';
import Link from 'next/link';

interface SupplementIngredientCardProps {
  ingredient: ProductIngredient;
}

const SupplementIngredientCard = ({ ingredient }: SupplementIngredientCardProps) => (
  <Link
    href={`/ingredient/${ingredient.ingredientId}`}
    aria-label={`${ingredient.name} 성분 상세 보기`}
    className='block rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
  >
    <article className='flex w-full items-center gap-3 whitespace-normal rounded-[20px] border-none no-center-glass bg-primary/30 px-5 py-4'>
      <SupplementProductImage
        imageKey={ingredient.imageUrl}
        alt={`${ingredient.name} 성분 이미지`}
        className='h-18.5 w-12'
      />
      <div className='flex min-w-0 flex-1 flex-col gap-2'>
        <div className='flex min-w-0 w-full flex-col items-start gap-1 pl-1'>
          <h3 className='min-w-0 truncate leading-none typo-body-5 text-black'>
            {ingredient.name}
          </h3>
          <p className='w-full whitespace-pre-line break-keep leading-tight typo-caption-3 text-black'>
            {ingredient.description}
          </p>
        </div>
        <div className='flex flex-wrap gap-1'>
          {ingredient.effectKeywords.map((keyword) => (
            <Chip key={`${ingredient.ingredientId}-${keyword}`} text={keyword} variant='point' />
          ))}
        </div>
      </div>
    </article>
  </Link>
);

export default SupplementIngredientCard;
