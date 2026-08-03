'use client';

import { TextButton } from '@/shared/components';
import { memo, useState } from 'react';
import InteractionWarningModal from '@/features/cabinet/components/modal/InteractionWarningModal';

const SupplementAddSection = () => {
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  return (
    <>
      <section className='px-5 mt-auto'>
        <TextButton
          type='button'
          text='캐비닛에 추가하기'
          size='xl'
          className='w-full'
          onClick={() => setIsWarningModalOpen(true)}
        />
      </section>

      {isWarningModalOpen && (
        <InteractionWarningModal
          onCancel={() => setIsWarningModalOpen(false)}
          onConfirm={() => {
            setIsWarningModalOpen(false);
          }}
          isdDuplication={true}
        />
      )}
    </>
  );
};

export default memo(SupplementAddSection);
