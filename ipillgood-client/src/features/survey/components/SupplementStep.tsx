'use client';

import { HorizonIcon, MinusCircleIcon } from '@/assets';
import { SelectionCard } from '@/shared/components';
import { StepHeader } from '@/shared/layout';
import { supplementItems } from '../constants/supplement.constants';
import useSelectable from '../hooks/useSelectable';

const SupplementStep = () => {
  const { selectedItems, handleSelect } = useSelectable();

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
          onClick={() => {
            // TODO: 바텀시트 열기
          }}
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
    </section>
  );
};

export default SupplementStep;
