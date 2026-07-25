import RankingProductDetailContainer from '@/features/ranking/components/detail/RankingProductDetailContainer';

type RankingProductDetailPageProps = {
  params: Promise<{ productId: string }>;
};

const RankingProductDetailPage = async ({ params }: RankingProductDetailPageProps) => {
  const { productId } = await params;

  return <RankingProductDetailContainer productId={Number(productId)} />;
};

export default RankingProductDetailPage;
