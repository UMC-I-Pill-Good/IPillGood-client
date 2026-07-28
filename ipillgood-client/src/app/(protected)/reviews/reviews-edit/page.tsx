import ReviewForm from '@/features/reviews/components/ReviewForm';

interface ReviewsEditPageProps {
  searchParams: Promise<{
    productId?: string;
    reviewId?: string;
  }>;
}

const ReviewsEditPage = async ({ searchParams }: ReviewsEditPageProps) => {
  const { productId, reviewId } = await searchParams;
  const resolvedProductId = Number(productId) || 9001;
  const resolvedReviewId = Number(reviewId) || 1;

  return <ReviewForm mode='edit' productId={resolvedProductId} reviewId={resolvedReviewId} />;
};

export default ReviewsEditPage;
