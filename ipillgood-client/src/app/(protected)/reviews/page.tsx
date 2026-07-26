import ReviewList from '@/features/reviews/components/ReviewList';

interface ReviewsPageProps {
  searchParams: Promise<{ productId?: string }>;
}

const ReviewsPage = async ({ searchParams }: ReviewsPageProps) => {
  const { productId } = await searchParams;
  const resolvedProductId = Number(productId) || 9001;

  return <ReviewList productId={resolvedProductId} />;
};

export default ReviewsPage;
