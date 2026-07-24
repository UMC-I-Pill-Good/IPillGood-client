'use client';

import { CabinetGrid } from '@/features/cabinet/components';
import { TextButton } from '@/shared/components';
import { Header } from '@/shared/layout';

const CabinetAddPage = () => {
  return (
    <main className='flex flex-col min-h-dvd pb-24'>
      <Header showBackButton={false} title='내 캐비닛' />

      <p className='typo-body-10 px-5 py-4'>섭취 중인 영양제에 추가할 영양제를 클릭하세요.</p>

      <CabinetGrid mode='add' />

      <section className='px-5 mt-auto'>
        <TextButton type='button' text='섭취 중인 영양제로 추가하기' size='xl' className='w-full' />
      </section>
    </main>
  );
};

export default CabinetAddPage;
