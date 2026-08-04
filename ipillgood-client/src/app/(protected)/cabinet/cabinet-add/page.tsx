import CabinetAddContent from '@/features/cabinet/components/cabinet-add/CabinetAddContent';
import { Header } from '@/shared/layout';

const CabinetAddPage = () => {
  return (
    <main className='flex h-dvh flex-col overflow-hidden'>
      <Header title='영양제 이름' />

      <p className='typo-body-10 px-5 py-4'>캐비닛에 추가하고 싶은 영양제를 선택해 주세요.</p>
      <CabinetAddContent />
    </main>
  );
};

export default CabinetAddPage;
