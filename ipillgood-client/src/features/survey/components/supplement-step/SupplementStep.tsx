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
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getIngredients } from '@/features/survey/api/ingredients';
import { useAtom, useSetAtom } from 'jotai';
import {
  currentIngredientIdsAtom,
  selectedIngredientItemsAtom,
} from '@/features/survey/atoms/survey.atom';
import { useSubmitSurveyMutation, useSelectable, useResetSurvey } from '@/features/survey/hooks';

const SupplementStep = () => {
  const router = useRouter();

  const [isOpenSheet, setIsOpenSheet] = useState(false);

  const resetSurvey = useResetSurvey(); // 설문 상태 초기화

  // 영양제 목록 조회
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['ingredients'],
    queryFn: getIngredients,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // 설문 최종 제출
  const { mutate: submitSurvey, isPending: isSubmitting } = useSubmitSurveyMutation();

  // 메인/기타 영양제 분리
  const mainIngredients =
    data?.result?.ingredients?.filter((item) => item.ingredientId <= 10) ?? [];

  const otherIngredients =
    data?.result?.ingredients?.filter((item) => item.ingredientId >= 11) ?? [];

  const [selectedItems, setSelectedItems] = useAtom(selectedIngredientItemsAtom);
  const setCurrentIngredientIds = useSetAtom(currentIngredientIdsAtom);

  // 영양제 선택 및 선택된 ID 저장
  const { handleSelect } = useSelectable<string>({
    exclusiveId: 'none',
    selectedItems,
    setSelectedItems: (items) => {
      const next = typeof items === 'function' ? items(selectedItems) : items;

      setSelectedItems(next);

      setCurrentIngredientIds(next.filter((item) => item !== 'none').map(Number));
    },
  });

  const isSubmitDisabled = selectedItems.length === 0 || isSubmitting;

  // 설문 제출
  const handleSubmitSurvey = () => {
    submitSurvey(undefined, {
      onSuccess: (data) => {
        router.push(`/survey/analyzing?recommendationId=${data.result.recommendationId}`);
      },
      onError: () => {
        alert('필수 입력값이 입력되지 않았습니다. 설문을 처음부터 다시 진행해주세요.');
        resetSurvey.resetSurvey();
        router.replace('/survey');
      },
    });
  };

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
          onClick={(value) => handleSelect(value)}
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
            onClick={(value) => handleSelect(value)}
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

          <div className='grid grid-cols-3 gap-2 overflow-y-auto thin-scrollbar h-130 pb-4'>
            {otherIngredients.map((item) => (
              <SelectionCard
                key={item.ingredientId}
                id={String(item.ingredientId)}
                label={item.name}
                image={item.imageUrl}
                isSelected={selectedItems.includes(String(item.ingredientId))}
                onClick={(value) => handleSelect(value)}
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
        disabled={isSubmitDisabled}
        onClick={handleSubmitSurvey}
      />
    </section>
  );
};

export default SupplementStep;
