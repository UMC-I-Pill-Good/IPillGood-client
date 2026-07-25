import { redirect } from 'next/navigation';

type LegacyReviewsPageProps = {
  params: Promise<{ productId: string }>;
};

const LegacyReviewsPage = async ({ params }: LegacyReviewsPageProps) => {
  const { productId } = await params;
  redirect(`/product/${productId}/reviews`);
};

export default LegacyReviewsPage;
