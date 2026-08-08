import PolicyDocumentSection from '@/features/policy/components/PolicyDocumentSection';
import { Header } from '@/shared/layout';

const HealthPolicyPage = () => {
  return (
    <main>
      <Header title='건강 정보 수집 및 이용' />
      <PolicyDocumentSection documentType='HEALTH_INFO_COLLECTION' />
    </main>
  );
};

export default HealthPolicyPage;
