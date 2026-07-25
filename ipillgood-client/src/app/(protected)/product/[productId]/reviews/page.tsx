import RankingReviewContainer from '@/features/ranking/components/review/RankingReviewContainer';

type RankingReviewPageProps = {
  params: Promise<{ productId: string }>;
};

const RankingReviewPage = async ({ params }: RankingReviewPageProps) => {
  const { productId } = await params;

  return <RankingReviewContainer productId={Number(productId)} />;
};

export default RankingReviewPage;
