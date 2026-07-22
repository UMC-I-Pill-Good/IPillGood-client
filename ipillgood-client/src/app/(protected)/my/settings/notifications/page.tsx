import { NotificationSection } from '@/features/my/components';
import { Header } from '@/shared/layout';

const NotificationsPage = () => {
  return (
    <main>
      <Header title='알림 설정' showCloseButton={true} />
      <NotificationSection />
    </main>
  );
};

export default NotificationsPage;
