'use client';

import { useState } from 'react';
import { CabinetGrid } from '@/features/cabinet/components';
import { TextButton } from '@/shared/components';
import ConfirmModal from '@/shared/components/modal/ConfirmModal';
import { Header } from '@/shared/layout';
import { useRouter } from 'next/navigation';

const CabinetDeletePage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className='flex min-h-dvh flex-col pb-24'>
        <Header showBackButton={false} title='내 캐비닛' />

        <p className='px-5 py-4 typo-body-10'>삭제할 영양제를 클릭하세요.</p>

        <CabinetGrid mode='delete' />

        <section className='mt-auto px-5'>
          <TextButton
            type='button'
            text='삭제하기'
            size='xl'
            className='w-full'
            onClick={() => setIsModalOpen(true)}
          />
        </section>
      </main>

      {isModalOpen && (
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
          onCancel={() => setIsModalOpen(false)}
          onConfirm={() => {
            // 삭제 API 호출
            setIsModalOpen(false);
            router.replace('/cabinet');
          }}
          contentClassName='text-semantic'
        />
      )}
    </>
  );
};

export default CabinetDeletePage;
