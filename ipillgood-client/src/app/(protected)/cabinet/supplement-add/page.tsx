import SupplementAddContent from '@/features/cabinet/components/supplement-add/SupplementAddContent';
import { Header } from '@/shared/layout';

const SupplementAddPage = () => {
  return (
    <main className='flex h-dvh flex-col overflow-hidden'>
      <Header title='영양제 이름' />

      <p className='typo-body-10 px-5 py-4'>캐비닛에 추가하고 싶은 영양제를 선택해 주세요.</p>

      <SupplementAddContent />
    </main>
  );
};

export default SupplementAddPage;
