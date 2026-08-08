import PolicyDocumentSection from '@/features/policy/components/PolicyDocumentSection';
import { Header } from '@/shared/layout';

const ServicePolicyPage = async ({ searchParams }: PageProps<'/policy/service'>) => {
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
