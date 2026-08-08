import { notFound } from 'next/navigation';
import RankingProductDetailContainer from '@/features/ranking/components/detail/RankingProductDetailContainer';

interface RankingProductDetailPageProps {
  params: Promise<{ productId: string }>;
}

const RankingProductDetailPage = async ({ params }: RankingProductDetailPageProps) => {
  const { productId } = await params;
  const resolvedProductId = Number(productId);

  if (!Number.isSafeInteger(resolvedProductId) || resolvedProductId <= 0) notFound();

  return <RankingProductDetailContainer productId={resolvedProductId} />;
};

export default RankingProductDetailPage;
