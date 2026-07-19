'use client';

import { MascotSadIcon } from '@/assets';
import { ConfirmModal, IconButton, TextButton } from '@/shared/components';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AnalyzeError = () => {
  const router = useRouter();

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <main className='flex min-h-screen flex-col px-5 py-4'>
      <section className='flex justify-end'>
        <IconButton ariaLabel='분석 취소 버튼' icon={<X />} onClick={() => setIsOpenModal(true)} />
      </section>

      <section className='flex flex-1 flex-col items-center justify-center mt-12'>
        <article className='flex flex-col items-center justify-center typo-subtitle-5 mb-30'>
          <p className='whitespace-pre-line text-center leading-7'>
            {'추천 결과를 불러오는 데\n실패했습니다.'}
          </p>
          <span className='typo-subtitle-5 text-semantic mt-3'>다시 시도해 주세요.</span>
        </article>

        <MascotSadIcon />

        <TextButton
          type='button'
          text='다시 시도'
          variant='semantic'
          size='xl'
          className='w-full mt-auto'
        />
      </section>

      {isOpenModal && (
        <ConfirmModal
          title={
            <span>
              분석을 <span className='text-semantic'>중단</span>하시겠습니까?
            </span>
          }
          onCancel={() => setIsOpenModal(false)}
          onConfirm={() => {
            router.push('/');
            setIsOpenModal(false);
          }}
        />
      )}
    </main>
  );
};

export default AnalyzeError;
