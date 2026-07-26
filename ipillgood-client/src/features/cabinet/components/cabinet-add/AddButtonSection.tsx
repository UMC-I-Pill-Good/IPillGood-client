'use client';

import { IntakeCycleModal, IntakeTimeModal, TextButton } from '@/shared/components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddButtonSection = () => {
  const router = useRouter();

  const [isIntakeTimeModalOpen, setISIntakeTimeModalOpen] = useState(false);
  const [isIntakeCycleModalOpen, setISIntakeCycleModalOpen] = useState(false);

  return (
    <>
      <section className='mt-auto px-5 pt-4'>
        <TextButton
          type='button'
          text='섭취 중인 영양제로 추가하기'
          size='xl'
          className='w-full'
          onClick={() => setISIntakeTimeModalOpen(true)}
        />
      </section>

      {isIntakeTimeModalOpen && (
        <IntakeTimeModal
          onCancel={() => setISIntakeTimeModalOpen(false)}
          onConfirm={() => {
            setISIntakeTimeModalOpen(false);
            setISIntakeCycleModalOpen(true);
          }}
        />
      )}

      {isIntakeCycleModalOpen && (
        <IntakeCycleModal
          onCancel={() => setISIntakeCycleModalOpen(false)}
          onConfirm={() => {
            setISIntakeCycleModalOpen(false);
            router.push('/cabinet');
          }}
        />
      )}
    </>
  );
};

export default AddButtonSection;
