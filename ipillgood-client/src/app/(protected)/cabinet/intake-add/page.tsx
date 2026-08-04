import IntakeAddContent from '@/features/cabinet/components/intake-add/IntakeAddContent';
import { Header } from '@/shared/layout';

const IntakeAddPage = () => {
  return (
    <main className='flex min-h-dvh flex-col pb-24'>
      <Header title='내 캐비닛' />

      <p className='px-5 py-4 typo-body-10'>섭취 중인 영양제에 추가할 영양제를 클릭하세요.</p>

      <IntakeAddContent />
    </main>
  );
};

export default IntakeAddPage;
