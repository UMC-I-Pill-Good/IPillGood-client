import RankingReviewEditContainer from '@/features/ranking/components/review/RankingReviewEditContainer';

type RankingReviewEditPageProps = {
  params: Promise<{
    productId: string;
    reviewId: string;
  }>;
};

const RankingReviewEditPage = async ({ params }: RankingReviewEditPageProps) => {
  const { productId, reviewId } = await params;

  return <RankingReviewEditContainer productId={Number(productId)} reviewId={Number(reviewId)} />;
};

export default RankingReviewEditPage;
