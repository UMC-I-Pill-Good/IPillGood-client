import PolicyDocumentSection from '@/features/policy/components/PolicyDocumentSection';
import { Header } from '@/shared/layout';

const MarketingPolicyPage = () => {
  return (
    <main>
      <Header title='마케팅 정보 수신' />
      <PolicyDocumentSection documentType='MARKETING' />
    </main>
  );
};

export default MarketingPolicyPage;
