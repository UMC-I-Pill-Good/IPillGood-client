import { CabinetGrid } from '@/features/cabinet/components';
import { Header } from '@/shared/layout';

const CabinetAddPage = () => {
  return (
    <main>
      <Header showBackButton={false} title='내 캐비닛' />

      <p className='typo-body-10 px-5 py-4'>이 소유 중인 영양제를 한 눈에 확인해 보세요!</p>

      <CabinetGrid />
    </main>
  );
};

export default CabinetAddPage;
