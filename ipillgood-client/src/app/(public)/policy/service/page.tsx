import PolicyDocumentSection from '@/features/policy/components/PolicyDocumentSection';
import { Header } from '@/shared/layout';

const ServicePolicyPage = () => {
  return (
    <main>
      <Header title='서비스 이용약관' />
      <PolicyDocumentSection documentType='SERVICE_TERMS' />
    </main>
  );
};

export default ServicePolicyPage;
