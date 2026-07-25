import { redirect } from 'next/navigation';

type LegacyReviewEditPageProps = {
  params: Promise<{ productId: string; reviewId: string }>;
};

const LegacyReviewEditPage = async ({ params }: LegacyReviewEditPageProps) => {
  const { productId, reviewId } = await params;
  redirect(`/product/${productId}/reviews/${reviewId}/edit`);
};

export default LegacyReviewEditPage;
