'use client';

import { useState } from 'react';
import { Omega3BottleIcon } from '@/assets';
import { Search } from 'lucide-react';
import { BottomSheet, Chip, TextButton } from '@/shared/components';
import type { ProductIngredient } from '../../types/ranking';

interface SupplementIngredientBottomSheetProps {
  ingredients: ProductIngredient[];
}

const SupplementIngredientCard = ({ ingredient }: { ingredient: ProductIngredient }) => (
  <article className='flex w-full items-center gap-3 whitespace-normal rounded-[20px] border border-white bg-primary-600/15 px-5 py-4 shadow-[0_4px_4px_rgba(126,131,135,0.1)]'>
    <div className='flex w-10.75 shrink-0 items-center justify-center self-center overflow-visible'>
      {ingredient.imageKey ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={ingredient.imageKey} alt='' className='h-17.5 w-10.75 object-contain' />
      ) : (
        <Omega3BottleIcon aria-hidden='true' className='h-17.5 w-10.75 object-contain' />
      )}
    </div>
    <div className='flex min-w-0 flex-1 flex-col gap-2'>
      <div className='flex min-w-0 w-full flex-col items-start gap-2 pl-1'>
        <Chip text='추천' variant='point' className='mb-1 bg-secondary-600 px-3 text-white' />
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

const SupplementIngredientBottomSheet = ({ ingredients }: SupplementIngredientBottomSheetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TextButton
        type='button'
        text='핵심 성분 더 알아보기'
        variant='assistive'
        size='sm'
        className='h-8 rounded-full border border-white/60 bg-white/35 px-3 text-neutral-800 shadow-[4px_4px_4px_rgba(126,131,135,0.1)] backdrop-blur-sm hover:bg-white/45 hover:text-neutral-800 active:bg-white/50'
        onClick={() => setOpen(true)}
      />
      <BottomSheet open={open} onOpenChange={setOpen}>
        <div className='flex max-h-[75dvh] flex-col overflow-y-auto pb-4 pt-8'>
          <div className='mx-auto flex size-30 items-center justify-center rounded-full bg-primary-200 opacity-99'>
            <Search aria-hidden='true' className='text-primary-600' size={60} strokeWidth={1.5} />
          </div>
          <h2 className='mt-8 text-center typo-body-5 text-black'>
            해당 영양제는 핵심 성분이{' '}
            <span className='text-primary-600'>{ingredients.length}개 이상</span>
            <br /> 포함되어 있어요!
          </h2>
          <p className='mt-8 typo-caption-6 text-neutral-800'>핵심 성분 ({ingredients.length})</p>
          <div className='mt-2 flex flex-col gap-3'>
            {ingredients.map((ingredient) => (
              <SupplementIngredientCard key={ingredient.ingredientId} ingredient={ingredient} />
            ))}
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default SupplementIngredientBottomSheet;
