import PolicyDocumentSection from '@/features/policy/components/PolicyDocumentSection';
import { Header } from '@/shared/layout';

interface ServicePolicyPageProps {
  searchParams: Promise<{ type?: string }>;
}

const ServicePolicyPage = async ({ searchParams }: ServicePolicyPageProps) => {
  const { type } = await searchParams;
  const isSignup = type === 'signup';

  return (
    <main>
      <Header title='서비스 이용약관' />
      <PolicyDocumentSection documentType='SERVICE_TERMS' isSignup={isSignup} />
    </main>
  );
};

export default ServicePolicyPage;
