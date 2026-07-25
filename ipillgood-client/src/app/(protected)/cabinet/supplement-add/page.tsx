import SupplementAddSection from '@/features/cabinet/components/supplement-add/SupplementAddSection';
import SupplementSearchSection from '@/features/cabinet/components/supplement-add/SupplementSearchSection';
import SupplementSortList from '@/features/cabinet/components/supplement-add/SupplementSortList';
import { Header } from '@/shared/layout';

const SupplementAddPage = () => {
  return (
    <main className='flex min-h-dvh flex-col pb-24'>
      <Header title='영양제 이름' />

      <p className='typo-body-10 px-5 py-4'>캐비닛에 추가하고 싶은 영양제를 선택해 주세요.</p>

      <SupplementSearchSection />

      <SupplementSortList />

      <SupplementAddSection />
    </main>
  );
};

export default SupplementAddPage;
