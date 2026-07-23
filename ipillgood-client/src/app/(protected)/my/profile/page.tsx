import { ProfileSection } from '@/features/my/components';
import { Header } from '@/shared/layout';

const ProfilePage = () => {
  return (
    <main className='flex flex-col min-h-dvh'>
      <Header title='프로필 관리' />
      <ProfileSection />
    </main>
  );
};

export default ProfilePage;
