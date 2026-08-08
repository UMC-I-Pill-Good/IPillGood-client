import { notFound } from 'next/navigation';

import ReviewForm from '@/features/reviews/components/ReviewForm';

interface ReviewsAddPageProps {
  searchParams: Promise<{ productId?: string }>;
}

const ReviewsAddPage = async ({ searchParams }: ReviewsAddPageProps) => {
  const { productId } = await searchParams;
  const resolvedProductId = Number(productId);

  if (!Number.isSafeInteger(resolvedProductId) || resolvedProductId <= 0) {
    notFound();
  }

  return <ReviewForm mode='add' productId={resolvedProductId} />;
};

export default ReviewsAddPage;
