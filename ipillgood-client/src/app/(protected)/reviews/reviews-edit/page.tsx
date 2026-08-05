import { notFound } from 'next/navigation';

import ReviewForm from '@/features/reviews/components/ReviewForm';

interface ReviewsEditPageProps {
  searchParams: Promise<{
    productId?: string;
    reviewId?: string;
  }>;
}

const ReviewsEditPage = async ({ searchParams }: ReviewsEditPageProps) => {
  const { productId, reviewId } = await searchParams;
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

  return <ReviewForm mode='edit' productId={resolvedProductId} reviewId={resolvedReviewId} />;
};

export default ReviewsEditPage;
