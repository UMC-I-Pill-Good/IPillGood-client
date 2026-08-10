import PolicyDocumentSection from '@/features/policy/components/PolicyDocumentSection';
import { Header } from '@/shared/layout';

interface MarketingPolicyPageProps {
  searchParams: Promise<{ type?: string }>;
}

const MarketingPolicyPage = async ({ searchParams }: MarketingPolicyPageProps) => {
  const { type } = await searchParams;
  const isSignup = type === 'signup';

  return (
    <main>
      <Header title='마케팅 정보 수신' />
      <PolicyDocumentSection documentType='MARKETING' isSignup={isSignup} />
    </main>
  );
};

export default MarketingPolicyPage;
