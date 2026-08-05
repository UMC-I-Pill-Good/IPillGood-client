import SupplementProductImage from './SupplementProductImage';
import type { ProductIngredient } from '../../types/ranking';
import { Chip } from '@/shared/components';

const SupplementIngredientCard = ({ ingredient }: { ingredient: ProductIngredient }) => (
  <article className='flex w-full items-center gap-3 whitespace-normal rounded-[20px] border border-white bg-primary-600/15 px-5 py-4 shadow-[0_4px_4px_rgba(126,131,135,0.1)]'>
    <SupplementProductImage
      imageKey={ingredient.imageUrl}
      alt={`${ingredient.name} 성분 이미지`}
      className='h-18.5 w-12'
    />
    <div className='flex min-w-0 flex-1 flex-col gap-2'>
      <div className='flex min-w-0 w-full flex-col items-start gap-2 pl-1'>
        <h3 className='min-w-0 truncate leading-none typo-body-5 text-black'>{ingredient.name}</h3>
        <p className='w-full whitespace-pre-line break-keep leading-tight typo-caption-7 text-black'>
          {ingredient.description}
        </p>
      </div>
      <div className='flex flex-wrap gap-2'>
        {ingredient.effectKeywords.map((keyword) => (
          <Chip key={`${ingredient.ingredientId}-${keyword}`} text={keyword} variant='point' />
        ))}
      </div>
    </div>
  </article>
);

export default SupplementIngredientCard;
