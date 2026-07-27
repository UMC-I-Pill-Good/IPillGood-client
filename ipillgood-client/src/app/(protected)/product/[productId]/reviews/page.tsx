import { notFound, redirect } from 'next/navigation';

interface RankingReviewPageProps {
  params: Promise<{ productId: string }>;
}

const RankingReviewPage = async ({ params }: RankingReviewPageProps) => {
  const { productId } = await params;
  const resolvedProductId = Number(productId);

  if (!Number.isSafeInteger(resolvedProductId) || resolvedProductId <= 0) {
    notFound();
  }

  redirect(`/reviews?productId=${resolvedProductId}`);
};

export default RankingReviewPage;
