'use client';

import { HorizonIcon, MinusCircleIcon } from '@/assets';
import {
  BottomSheet,
  FetchError,
  LoadingSpinner,
  SelectionCard,
  TextButton,
} from '@/shared/components';
import { StepHeader } from '@/shared/layout';
import useSelectable from '@/features/survey/hooks/useSelectable';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getIngredients } from '../../api/ingredients';
import { useSetAtom } from 'jotai';
import { currentIngredientIdsAtom } from '../../atoms/survey.atom';

const SupplementStep = () => {
  const router = useRouter();

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['contraindications'],
    queryFn: getIngredients,
  });

  const mainIngredients =
    data?.result?.ingredients?.filter((item) => item.ingredientId <= 21) ?? [];

  const otherIngredients =
    data?.result?.ingredients?.filter((item) => item.ingredientId >= 22) ?? [];

  const setSelectedIngredientIds = useSetAtom(currentIngredientIdsAtom);

  const { selectedItems, handleSelect } = useSelectable<string>({
    exclusiveId: 'none',
  });

  const handleIngredientSelect = (id: string) => {
    handleSelect(id);

    setSelectedIngredientIds((prev) => {
      if (id === 'none') {
        return [];
      }

      const ingredientId = Number(id);

      if (prev.includes(ingredientId)) {
        return prev.filter((item) => item !== ingredientId);
      }

      return [...prev, ingredientId];
    });
  };

  const [isOpenSheet, setIsOpenSheet] = useState(false);

  if (isPending) return <LoadingSpinner />;

  if (isError)
    return (
      <FetchError description='영양제 정보를 불러오지 못했습니다.' onRetry={() => refetch()} />
    );

  return (
    <section className='flex flex-1 flex-col'>
      <StepHeader
        title='현재 섭취 중인 영양제가 있나요?'
        desc={'현재 섭취 중인 영양제를 선택해주세요.\n(복수 선택 가능)'}
      />

      <div className='mt-2 grid grid-cols-3 gap-2 pb-8'>
        <SelectionCard
          id='none'
          label={'섭취 중인\n영양제 없음'}
          icon={MinusCircleIcon}
          isSelected={selectedItems.includes('none')}
          onClick={handleIngredientSelect}
          className='h-32 w-full rounded-[20px]'
          hasIconBackground={false}
        />

        {mainIngredients.map((item) => (
          <SelectionCard
            key={item.ingredientId}
            id={String(item.ingredientId)}
            label={item.name}
            image={item.imageUrl}
            isSelected={selectedItems.includes(String(item.ingredientId))}
            onClick={handleIngredientSelect}
            className='h-32 w-full rounded-[20px]'
          />
        ))}

        <SelectionCard
          id='etc'
          label='더보기'
          icon={HorizonIcon}
          isSelected={false}
          onClick={() => setIsOpenSheet(true)}
          className='h-32 w-full rounded-[20px]'
          hasIconBackground={false}
        />
      </div>

      <BottomSheet open={isOpenSheet} onOpenChange={() => setIsOpenSheet(false)}>
        <div className='mt-8 flex flex-col space-y-4 pb-4'>
          <h1 className='typo-body-1 text-center'>기타 영양제 리스트</h1>

          <div className='grid grid-cols-3 gap-2 overflow-y-auto thin-scrollbar h-120 pb-4'>
            {otherIngredients.map((item) => (
              <SelectionCard
                key={item.ingredientId}
                id={String(item.ingredientId)}
                label={item.name}
                image={item.imageUrl}
                isSelected={selectedItems.includes(String(item.ingredientId))}
                onClick={handleIngredientSelect}
                className='h-32 w-full rounded-[20px]'
              />
            ))}
          </div>

          <TextButton
            type='submit'
            text='선택 완료'
            size='xl'
            className=' w-full'
            onClick={() => setIsOpenSheet(false)}
          />
        </div>
      </BottomSheet>

      <TextButton
        type='button'
        text='설문 완료'
        size='xl'
        className='mt-auto w-full'
        onClick={() => router.push('/survey/analyzing')}
      />
    </section>
  );
};

export default SupplementStep;
