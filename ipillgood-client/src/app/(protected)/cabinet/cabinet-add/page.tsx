'use client';

import { CabinetGrid } from '@/features/cabinet/components';
import { TextButton } from '@/shared/components';
import { Header } from '@/shared/layout';
import { useRouter } from 'next/navigation';

const CabinetAddPage = () => {
  const router = useRouter();

  return (
    <main className='flex min-h-dvh flex-col pb-24'>
      <Header showBackButton={false} title='내 캐비닛' />

      <p className='px-5 py-4 typo-body-10'>섭취 중인 영양제에 추가할 영양제를 클릭하세요.</p>

      <CabinetGrid mode='add' />

      <section className='mt-auto px-5 pt-4'>
        <TextButton
          type='button'
          text='저장하기'
          size='xl'
          className='w-full'
          onClick={() => router.replace('/cabinet')}
        />
      </section>
    </main>
  );
};

export default CabinetAddPage;
