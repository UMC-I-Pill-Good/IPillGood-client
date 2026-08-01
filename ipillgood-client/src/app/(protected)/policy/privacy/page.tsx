import PolicyDocumentSection from '@/features/policy/components/PolicyDocumentSection';
import { Header } from '@/shared/layout';

const PrivacyPolicyPage = () => {
  return (
    <main>
      <Header title='개인정보 처리방침' />
      <PolicyDocumentSection documentType='PRIVACY_COLLECTION' />
    </main>
  );
};

export default PrivacyPolicyPage;
