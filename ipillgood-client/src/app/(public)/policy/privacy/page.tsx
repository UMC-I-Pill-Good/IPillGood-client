import { PrivacyPolicySection } from '@/features/policy/components';
import { Header } from '@/shared/layout';

const PrivacyPolicyPage = () => {
  return (
    <main>
      <Header title='개인정보 처리방침' />
      <PrivacyPolicySection />
    </main>
  );
};

export default PrivacyPolicyPage;
