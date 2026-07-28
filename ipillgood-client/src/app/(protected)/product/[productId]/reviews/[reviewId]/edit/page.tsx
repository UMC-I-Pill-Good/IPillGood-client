import { notFound, redirect } from 'next/navigation';

interface RankingReviewEditPageProps {
  params: Promise<{
    productId: string;
    reviewId: string;
  }>;
}

const RankingReviewEditPage = async ({ params }: RankingReviewEditPageProps) => {
  const { productId, reviewId } = await params;
  const resolvedProductId = Number(productId);
  const resolvedReviewId = Number(reviewId);

  if (
    !Number.isSafeInteger(resolvedProductId) ||
    resolvedProductId <= 0 ||
    !Number.isSafeInteger(resolvedReviewId) ||
    resolvedReviewId <= 0
  ) {
    notFound();
  }

  redirect(`/reviews/reviews-edit?productId=${resolvedProductId}&reviewId=${resolvedReviewId}`);
};

export default RankingReviewEditPage;
