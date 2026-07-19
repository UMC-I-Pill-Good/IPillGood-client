'use client';

import { HorizonIcon, MinusCircleIcon } from '@/assets';
import { BottomSheet, SelectionCard, TextButton } from '@/shared/components';
import { StepHeader } from '@/shared/layout';
import { otherSupplementItems, supplementItems } from '../constants/supplement.constants';
import useSelectable from '../hooks/useSelectable';
import { useState } from 'react';

const SupplementStep = () => {
  const { selectedItems, handleSelect } = useSelectable({
    exclusiveId: 'none',
  });
  const [isOpenSheet, setIsOpenSheet] = useState(false);

  return (
    <section className='pb-8'>
      <StepHeader
        title='현재 섭취 중인 영양제가 있나요?'
        desc={'현재 섭취 중인 영양제를 선택해주세요.\n(복수 선택 가능)'}
      />

      <div className='mt-2 grid grid-cols-3 gap-2'>
        {supplementItems.map((item) => (
          <SelectionCard
            key={item.id}
            {...item}
            isSelected={selectedItems.includes(item.id)}
            onClick={handleSelect}
            className='h-32 w-full rounded-[20px]'
          />
        ))}

        <SelectionCard
          id='etc'
          label='기타'
          icon={HorizonIcon}
          isSelected={false}
          onClick={() => setIsOpenSheet(true)}
          className='h-32 w-full rounded-[20px]'
          hasIconBackground={false}
        />

        <SelectionCard
          id='none'
          label={'섭취 중인\n영양제 없음'}
          icon={MinusCircleIcon}
          isSelected={selectedItems.includes('none')}
          onClick={handleSelect}
          className='h-32 w-full rounded-[20px]'
          hasIconBackground={false}
        />
      </div>

      <BottomSheet open={isOpenSheet} onOpenChange={() => setIsOpenSheet(false)}>
        <div className='mt-8 flex flex-col space-y-4 pb-4'>
          <h1 className='typo-body-1 text-center'>기타 영양제 리스트</h1>

          <div className='grid grid-cols-3 gap-2 overflow-y-auto thin-scrollbar h-120 pb-4'>
            {otherSupplementItems.map((item) => (
              <SelectionCard
                key={item.id}
                {...item}
                isSelected={selectedItems.includes(item.id)}
                onClick={handleSelect}
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
    </section>
  );
};

export default SupplementStep;
