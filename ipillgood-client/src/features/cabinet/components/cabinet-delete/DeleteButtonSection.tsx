'use client';

import { ConfirmModal, TextButton } from '@/shared/components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteButtonSection = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();

  return (
    <section className='mt-auto px-5 pt-4'>
      <TextButton
        type='button'
        text='삭제하기'
        size='xl'
        className='w-full'
        onClick={() => setIsDeleteModalOpen(true)}
      />

      {isDeleteModalOpen && (
        <ConfirmModal
          title={
            <>
              오메가 3& 종합 비타민
              <br />
              해당 영양제를 정말 삭제하시겠습니까?
            </>
          }
          content='삭제한 영양제는 복구가 어렵습니다.'
          cancelLabel='아니요'
          confirmLabel='네'
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            setIsDeleteModalOpen(false);
            router.replace('/cabinet');
            // 삭제 API
          }}
          contentClassName='text-semantic'
        />
      )}
    </section>
  );
};

export default DeleteButtonSection;
