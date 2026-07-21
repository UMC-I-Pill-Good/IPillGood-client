import { Header } from '@/shared/layout';
import CabinetActions from '@/features/cabinet/components/CabinetActions';
import { CabinetGrid } from '@/features/cabinet/components';

const CabinetPage = () => {
  return (
    <main>
      <Header showBackButton={false} title='내 캐비닛' />

      <CabinetActions />

      <CabinetGrid />
    </main>
  );
};

export default CabinetPage;
