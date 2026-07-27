import { notFound, redirect } from 'next/navigation';

interface LegacyReviewsPageProps {
  params: Promise<{ productId: string }>;
}

const LegacyReviewsPage = async ({ params }: LegacyReviewsPageProps) => {
  const { productId } = await params;
  const resolvedProductId = Number(productId);

  if (!Number.isSafeInteger(resolvedProductId) || resolvedProductId <= 0) {
    notFound();
  }

  redirect(`/reviews?productId=${resolvedProductId}`);
};

export default LegacyReviewsPage;
