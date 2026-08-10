import { notFound } from 'next/navigation';
import ReviewList from '@/features/reviews/components/ReviewList';

interface ReviewsPageProps {
  searchParams: Promise<{ productId?: string }>;
}

const ReviewsPage = async ({ searchParams }: ReviewsPageProps) => {
  const { productId } = await searchParams;
  const resolvedProductId = Number(productId);

  if (!Number.isSafeInteger(resolvedProductId) || resolvedProductId <= 0) {
    notFound();
  }

  return <ReviewList productId={resolvedProductId} />;
};

export default ReviewsPage;
