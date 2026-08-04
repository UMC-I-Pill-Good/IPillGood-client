import { Header } from '@/shared/layout';
import CabinetDeleteContent from '@/features/cabinet/components/cabinet-delete/CabinetDeleteContent';

const CabinetDeletePage = () => {
  return (
    <>
      <main className='flex min-h-dvh flex-col pb-24'>
        <Header title='내 캐비닛' />

        <p className='px-5 py-4 typo-body-10'>삭제할 영양제를 클릭하세요.</p>

        <CabinetDeleteContent />
      </main>
    </>
  );
};

export default CabinetDeletePage;
