'use client';

import { CabinetGrid } from '@/features/cabinet/components';
import { TextButton } from '@/shared/components';
import { Header } from '@/shared/layout';
import { useRouter } from 'next/navigation';

const CabinetDeletePage = () => {
  const router = useRouter();

  return (
    <main className='flex flex-col min-h-dvh pb-24'>
      <Header showBackButton={false} title='내 캐비닛' />

      <p className='typo-body-10 px-5 py-4'>삭제할 영양제를 클릭하세요.</p>

      <CabinetGrid mode='delete' />

      <section className='mt-auto px-5'>
        <TextButton
          type='button'
          text='삭제하기'
          size='xl'
          className='w-full'
          onClick={() => router.replace('/cabinet')}
        />
      </section>
    </main>
  );
};

export default CabinetDeletePage;
