'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { BottomSheet, TextButton } from '@/shared/components';
import type { ProductIngredient } from '../../types/ranking';
import SupplementIngredientCard from './SupplementIngredientCard';

interface SupplementIngredientBottomSheetProps {
  ingredients: ProductIngredient[];
}

const SupplementIngredientBottomSheet = ({ ingredients }: SupplementIngredientBottomSheetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TextButton
        type='button'
        text='핵심 성분 더 알아보기'
        variant='assistive'
        size='sm'
        className='h-8 rounded-full border border-white/60 bg-white/35 px-3 text-neutral-800 shadow-[4px_4px_4px_rgba(126,131,135,0.1)] backdrop-blur-sm hover:bg-neutral-800/50'
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
