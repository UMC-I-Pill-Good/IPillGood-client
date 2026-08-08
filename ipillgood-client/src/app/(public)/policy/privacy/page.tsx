import PolicyDocumentSection from '@/features/policy/components/PolicyDocumentSection';
import { Header } from '@/shared/layout';

interface PrivacyPolicyPageProps {
  searchParams: Promise<{ type?: string }>;
}

const PrivacyPolicyPage = async ({ searchParams }: PrivacyPolicyPageProps) => {
  const { type } = await searchParams;
  const isSignup = type === 'signup';

  return (
    <main>
      <Header title='개인정보 처리방침' />
      <PolicyDocumentSection documentType='PRIVACY_COLLECTION' isSignup={isSignup} />
    </main>
  );
};

export default PrivacyPolicyPage;
