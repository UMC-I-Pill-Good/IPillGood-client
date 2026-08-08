import PolicyDocumentSection from '@/features/policy/components/PolicyDocumentSection';
import { Header } from '@/shared/layout';

interface HealthPolicyPageProps {
  searchParams: Promise<{ type?: string }>;
}

const HealthPolicyPage = async ({ searchParams }: HealthPolicyPageProps) => {
  const { type } = await searchParams;
  const isSignup = type === 'signup';

  return (
    <main>
      <Header title='건강 정보 수집 및 이용' />
      <PolicyDocumentSection documentType='HEALTH_INFO_COLLECTION' isSignup={isSignup} />
    </main>
  );
};

export default HealthPolicyPage;
