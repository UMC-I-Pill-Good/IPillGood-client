'use client';

import { useState } from 'react';
import { Omega3BottleIcon } from '@/assets';
import { Search } from 'lucide-react';
import { BottomSheet, Chip, TextButton } from '@/shared/components';
import type { ProductIngredient } from '../../types/ranking';

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
        className='h-8 rounded-full border border-white/60 bg-white/35 px-3 text-neutral-800 shadow-[4px_4px_4px_rgba(126,131,135,0.1)] backdrop-blur-sm hover:bg-white/45 hover:text-neutral-800 active:bg-white/50'
        onClick={() => setOpen(true)}
      />
      <BottomSheet open={open} onOpenChange={setOpen}>
        <div className='flex max-h-[75dvh] flex-col overflow-y-auto pb-4 pt-6'>
          <div className='mx-auto flex size-[120px] items-center justify-center gap-2.5 rounded-full bg-primary-200 p-[30px] opacity-[0.99]'>
            <span className='block size-[60px] shrink-0 text-primary-600'>
              <Search aria-hidden='true' className='block h-full w-full' strokeWidth={1.5} />
            </span>
          </div>
          <h2 className='mt-8 text-center typo-body-5 text-black'>
            해당 영양제는 핵심 성분이{' '}
            <span className='text-primary-600'>{ingredients.length}개 이상</span>
            <br /> 포함되어 있어요!
          </h2>
          <p className='mt-8 typo-body-10 text-neutral-800'>핵심 성분 ({ingredients.length})</p>
          <div className='mt-2 flex flex-col gap-3'>
            {ingredients.map((ingredient) => (
              <article
                key={ingredient.ingredientId}
                className='!h-auto !w-full !flex !whitespace-normal items-center gap-5 rounded-[20px] border border-white bg-[rgba(127,153,255,0.15)] px-5 py-4 shadow-[0_4px_4px_rgba(126,131,135,0.1)]'
              >
                <div className='flex w-[54px] shrink-0 items-center justify-center self-center overflow-visible'>
                  {ingredient.imageKey ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ingredient.imageKey} alt='' className='h-[80px] w-[54px] object-contain' />
                  ) : (
                    <Omega3BottleIcon aria-hidden='true' className='h-[80px] w-[54px] object-contain' />
                  )}
                </div>
                <div className='flex min-w-0 flex-1 flex-col gap-2'>
                  <div className='flex min-w-0 w-full flex-col items-start gap-1'>
                    <div className='flex min-w-0 w-full flex-col items-start gap-2 pl-1'>
                      <Chip
                        text='추천'
                        variant='point'
                        className='mb-1 h-6 bg-secondary-600 px-3 text-white typo-caption-6'
                      />
                      <h3 className='min-w-0 truncate leading-none typo-body-5 text-black'>
                        {ingredient.name}
                      </h3>
                      <p className='w-full whitespace-pre-line break-keep leading-tight typo-caption-7 text-black'>
                        {ingredient.description}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {ingredient.effectKeywords.map((keyword) => (
                      <Chip key={`${ingredient.ingredientId}-${keyword}`} text={keyword} variant='point' />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default SupplementIngredientBottomSheet;
