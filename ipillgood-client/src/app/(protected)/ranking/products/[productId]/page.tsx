import { redirect } from 'next/navigation';

interface LegacyProductPageProps {
  params: Promise<{ productId: string }>;
};

const LegacyProductPage = async ({ params }: LegacyProductPageProps) => {
  const { productId } = await params;
  redirect(`/product/${productId}`);
};

export default LegacyProductPage;
