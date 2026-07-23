import { SettingsSection } from '@/features/my/components';
import { Header } from '@/shared/layout';

const SettingsPage = () => {
  return (
    <main className='flex flex-col min-h-dvh'>
      <Header title='설정' />
      <SettingsSection />
    </main>
  );
};

export default SettingsPage;
