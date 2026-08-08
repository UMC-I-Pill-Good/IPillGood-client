import PolicyDocumentSection from '@/features/policy/components/PolicyDocumentSection';
import { Header } from '@/shared/layout';

const MarketingPolicyPage = async ({ searchParams }: PageProps<'/policy/marketing'>) => {
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
