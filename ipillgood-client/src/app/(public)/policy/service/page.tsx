import { ServiceTermSection } from '@/features/policy/components';
import { Header } from '@/shared/layout';

const ServicePage = () => {
  return (
    <main>
      <Header title='서비스 이용약관' />
      <ServiceTermSection />
    </main>
  );
};

export default ServicePage;
